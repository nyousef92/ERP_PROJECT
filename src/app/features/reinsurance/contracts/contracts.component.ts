import { Component, OnInit, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { PaginatorComponent } from "@shared/paginator/paginator.component";
import { HelperService } from '@core/services/helper.service';
import { ContractsService } from '@core/services/contracts.service';
import { SharedService } from '@core/services/shared.service';
import { forkJoin } from 'rxjs';
import { CardsGridComponent } from '@shared/cards-grid/cards-grid.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { DeleteItemComponent } from '@shared/delete-item/delete-item.component';

@Component({
  selector: 'app-contracts',
  imports: [CardsGridComponent, NgClass, InputFieldComponent, PaginatorComponent, ModalComponent],
  templateUrl: './contracts.component.html'
})
export class ContractsComponent implements OnInit {

  searchText = '';
  metrics: any[] = [];
  contracts: any[] = [];
  totalItems = 0;
  allChecked = false;

  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(
    private helper: HelperService,
    private contractsService: ContractsService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.contractsService.getContractsMetric(),
      this.contractsService.getContractsHisroty({ pageSize: 6, currentPage: 1, searchText: this.searchText })
    ]).subscribe(([metrics, history]) => {
      this.metrics = metrics;
      this.contracts = history.data
        .map(item => ({ ...item, statusClasses: this.helper.getStatusClass(item.status), checked: false }));
      this.totalItems = history.totalItems;
    });
  }

  updateSearchValue(value: string) {
    this.searchText = value;
    this.getContracts();
  }

  getContracts(currentPage = 1) {
    this.contractsService.getContractsHisroty({ pageSize: 6, currentPage, searchText: this.searchText })
      .subscribe(resp => {
        this.contracts = resp.data
          .map(item =>
            ({ ...item, statusClasses: this.helper.getStatusClass(item.status) }))
          .map(item => ({ ...item, checked: false }));
        this.totalItems = resp.totalItems;
      });
  }
  selectAll() {
    this.allChecked = !this.allChecked;
    this.contracts.forEach(item => item.checked = this.allChecked);
  }

  checkElement(item: any) {
    item.checked = !item.checked;
    this.allChecked = this.contracts.every(c => c.checked);
  }
  export() {
    const checked = this.contracts.filter(item => item.checked);
    const toExport = (checked.length ? checked : this.contracts)
      .map(({ id, name, status, date, value }) => ({ id, name, status, date, value }));
    this.shared.exportAsExcelFile(toExport, 'Contracts');
  }
  addNew() { }

  viewContract(id: string) { }

  editContract(id: string) { }

  delete(refNo: string) {
    this.modal.open(DeleteItemComponent, {
      description: `Are you sure you want to delete placement with ref no ${refNo}?`,
      onDelete: () => {
        this.contractsService.deleteContract(refNo).subscribe(() => {
          this.contracts = this.contracts.filter(p => p.id !== refNo);
          this.totalItems--;
        });
      }
    }, 'sm');
  }

}
