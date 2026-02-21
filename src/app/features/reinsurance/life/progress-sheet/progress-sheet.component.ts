import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';
import { ProgressSheetService } from '@core/services/progress.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsGridComponent } from "@shared/cards-grid/cards-grid.component";
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { forkJoin } from 'rxjs';
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


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private progressSheetService: ProgressSheetService,
    private helper: HelperService) { }

  addNew() { }
  ngOnInit(): void {
    forkJoin([
      this.progressSheetService.getFileProgressSheetMetrics(),
      this.progressSheetService.getFileProgressSheetHistory({
        search: '',
        currentPage: this.currentPage,
        pageSize: 6
      })

    ])
      .subscribe((data) => {
        this.progressMetrics = data[0];
        this.history = data[1].data.map(item => {
          const statusClass = this.helper.getStatusClass(item.status);
          return { ...item, statusClass }
        });
        this.totalItems = data[1].totalItems;
      });
  }

  updateSearchValue(value: string, page: number) {
    this.searchValue = value;
    this.currentPage = page;
    this.progressSheetService.getFileProgressSheetHistory(
      {
        search: this.searchValue,
        currentPage: this.currentPage,
        pageSize: 6
      }
    ).subscribe((data) => {
      this.progressMetrics = data.data.map(item => {
        const statusClass = this.helper.getStatusClass(item.status);
        return { ...item, statusClass }
      });
      this.totalItems = data.totalItems;
    });
  }
}
