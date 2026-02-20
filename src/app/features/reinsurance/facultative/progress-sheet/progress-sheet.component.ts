import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';
import { FacultativeService } from '@core/services/facultative.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProgressSheetComponent } from './edit-progress-sheet/edit-progress-sheet.component';
import { CardsGridComponent } from "@shared/cards-grid/cards-grid.component";
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { forkJoin } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-progress-sheet',
  imports: [ModalComponent, CardsGridComponent, InputFieldComponent,NgClass],
  templateUrl: './progress-sheet.component.html'
})
export class ProgressSheetComponent implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent;
  progressMetrics: any;
  history: any[] = [];

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
        currentPage: 1,
        pageSize: 6
      })

    ])
      .subscribe((data) => {
        this.progressMetrics = data[0];
        this.history = data[1];
      });
  }


  updateSearchValue(value: string) {
    this.facultativeService.getProgressSheetHistory(
      {
        search: value,
        currentPage: 1,
        pageSize: 6
      }
    ).subscribe((data) => {
      this.progressMetrics = data;
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'Bound': return 'bg-green-100 text-green-700 border-green-200';
      case 'Quoted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Submitted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  
}
