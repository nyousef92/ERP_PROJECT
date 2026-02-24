import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProgressSheetComponent } from './add-progress-sheet/add-progress-sheet.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { ProgressSheetService } from '@core/services/progress.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsGridComponent } from "@shared/cards-grid/cards-grid.component";
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { exhaustMap, forkJoin, take, Subject } from 'rxjs';
import { NgClass } from '@angular/common';
import { DeleteItemComponent } from '@shared/delete-item/delete-item.component';
import { PaginatorComponent } from "@shared/paginator/paginator.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: 'app-progress-sheet',
  imports: [
    PaginatorComponent,
    NgClass,
    InputFieldComponent,
    FormsModule,
    CardsGridComponent,
    ModalComponent
  ],
  templateUrl: './progress-sheet.component.html'
})
export class ProgressSheetComponent {

  @ViewChild(ModalComponent) modal!: ModalComponent;
  progressMetrics: any;
  history: any[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  searchValue: string = '';
  searchBalueChanged: Subject<string> = new Subject();
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private progressSheetService: ProgressSheetService,
    private helper: HelperService) { }

  addNew() {
    this.modal.open(AddProgressSheetComponent, {
      onSaved: (data: any) => {
        this.progressSheetService.addNewLifeProgressSheet(data).subscribe(() => {
          this.history = [{ ...data, statusClass: this.helper.getStatusClass('Submitted') }, ...this.history];
          this.totalItems += 1;
        });
        this.getPageData();
      }
    }, 'xl');
  }

  edit(refNo: string) {
    this.progressSheetService.getProgressSheetDetailsView(refNo, 'life').subscribe((data) => {
      this.modal.open(AddProgressSheetComponent, {
        progressSheet: data,
        onSaved: (updated: any) => {
          this.progressSheetService.updateProgressSheet(refNo, updated).subscribe();
          this.getPageData();

        }
      }, 'xl')
    });

  }
  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    forkJoin([
      this.progressSheetService.getFileProgressSheetMetrics(),
      this.progressSheetService.getFileProgressSheetHistory({
        search: '',
        currentPage: this.currentPage,
        pageSize: 6
      })
    ]).pipe(take(1)).subscribe((data) => {
      this.progressMetrics = data[0];
      this.history = data[1].data.map(item => {
        const statusClass = this.helper.getStatusClass(item.status);
        return { ...item, statusClass }
      });
      this.totalItems = data[1].totalItems;
    });
  }

  addEventListener() {
    this.searchBalueChanged.pipe(exhaustMap((seachVal) => this.updateSearchValue(seachVal, this.currentPage)))
      .subscribe(resp => {
        if (resp) {
          this.router.navigate(['/two-factor-auth'])
        }
      });
  }

  updateSearchValue(value: string, page: number) {
    this.searchValue = value;
    this.currentPage = page;
    return this.progressSheetService.getFileProgressSheetHistory(
      {
        search: this.searchValue,
        currentPage: this.currentPage,
        pageSize: 6
      }
    )
  }

  delete(refNo: string) {
    this.progressSheetService.getProgressSheetDetailsView(refNo).subscribe((data) => {
      this.modal.open(DeleteItemComponent, {
        description: `Are you sure you want to delete progress sheet with ref no ${refNo}?`,
        onDelete: () => {
          this.modal.close();
          this.history = this.history.filter(h => h.refNo !== refNo);
          this.progressSheetService.deleteProgressSheet(refNo).subscribe()
        }
      }, 'sm')
    });
  }

  preViewProgressSheet(refNo: any) {
    this.router.navigate(
      ['home/reinsurance/life/progress-sheet/preview', refNo]
    );
  }
}
