import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';
import { FacultativeService } from '@core/services/facultative.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProgressSheetComponent } from './edit-progress-sheet/edit-progress-sheet.component';
import { CardsGridComponent } from "@shared/cards-grid/cards-grid.component";
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { forkJoin } from 'rxjs';
import { NgClass } from '@angular/common';
import { DeleteItemComponent } from '@shared/delete-item/delete-item.component';
import { PaginatorComponent } from "@shared/paginator/paginator.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-sheet',
  imports: [ModalComponent, CardsGridComponent, InputFieldComponent, NgClass, PaginatorComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './progress-sheet.component.html'
})
export class ProgressSheetComponent implements OnInit {


  @ViewChild(ModalComponent) modal!: ModalComponent;
  progressMetrics: any;
  history: any[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  searchValue: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facultativeService: FacultativeService) {
  }

  ngOnInit(): void {
    forkJoin([
      this.facultativeService.getProgressSheetMetrics(),
      this.facultativeService.getProgressSheetHistory({
        search: '',
        currentPage: this.currentPage,
        pageSize: 6
      })

    ])
      .subscribe((data) => {
        this.progressMetrics = data[0];
        this.history = data[1].data;
        this.totalItems = data[1].totalItems;
      });
  }


  updateSearchValue(value: string, page: number) {
    this.searchValue = value;
    this.currentPage = page;
    this.facultativeService.getProgressSheetHistory(
      {
        search: this.searchValue,
        currentPage: this.currentPage,
        pageSize: 6
      }
    ).subscribe((data) => {
      this.progressMetrics = data.data;;
      this.totalItems = data.totalItems;
    });
  }

  addNew() {
    this.modal.open(EditProgressSheetComponent, {
      progressSheet: null,
      onSaved: (updated: any) => {
        this.facultativeService.addNewProgressSheet(updated).subscribe()
      }
    }, 'xl')
  }

  edit(refNo: string) {
    this.facultativeService.getProgressSheetDetailsView(refNo).subscribe((data) => {
      this.modal.open(EditProgressSheetComponent, {
        progressSheet: data,
        onSaved: (updated: any) => {
          this.facultativeService.updateProgressSheet(refNo, updated).subscribe()
        }
      }, 'xl')
    });

  }

  delete(refNo: string) {
    this.facultativeService.getProgressSheetDetailsView(refNo).subscribe((data) => {
      this.modal.open(DeleteItemComponent, {
        description: `Are you sure you want to delete progress sheet with ref no ${refNo}?`,
        onDelete: () => {
          this.modal.close();
          this.history = this.history.filter(h => h.refNo !== refNo);
          this.facultativeService.deleteProgressSheet(refNo).subscribe()
        }
      }, 'sm')
    });

  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Bound': return 'bg-green-100 text-green-700 border-green-200';
      case 'Quoted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Submitted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  }


  preViewProgressSheet(refNo: any) {
    this.router.navigate(
      ['home/reinsurance/facultative/progress-sheet/preview-facultative-progress-sheet', refNo]
    );
  }
}
