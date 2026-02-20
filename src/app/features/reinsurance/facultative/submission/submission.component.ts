import { Component, OnInit } from '@angular/core';
import { ColoredCardsGridComponent } from "@shared/colored-cards-grid/colored-cards-grid.component";
import { ReinsuranceService } from '@core/services/reinsurance.service';
import { NgClass } from '@angular/common';
import { forkJoin } from 'rxjs';
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { Router } from '@angular/router';
import { PaginatorComponent } from "@shared/paginator/paginator.component";

@Component({
  selector: 'app-submission',
  imports: [ColoredCardsGridComponent, NgClass, InputFieldComponent, PaginatorComponent],
  templateUrl: './submission.component.html'
})
export class SubmissionComponent implements OnInit {
  searchText = '';
  metrics: any[] = [];
  history: any[] = [];
  totalItems = 0;

  constructor(
    private reinsuranceService: ReinsuranceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.reinsuranceService.getSubmissionMetrics(),
        this.reinsuranceService.getSubmissionHistory({
          pageSize: 6,
          currentPage: 1,
          searchText: this.searchText
        })
      ]
    ).subscribe(data => {
      this.metrics = data[0];
      this.history = data[1].data;
      this.totalItems = data[1].totalItems;
    });
  }

  updateSearchValue(value: string) {
    this.searchText = value;
    this.getSubmissionHistory()
  }

  getSubmissionHistory(currentPage = 1) {
    this.reinsuranceService.getSubmissionHistory({
      pageSize: 6,
      currentPage,
      searchText: this.searchText
    }).subscribe(resp => {
      this.history = resp.data;
      this.totalItems = resp.totalItems
    }).unsubscribe();

  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Bound': return 'bg-green-100 text-green-700 border-green-200';
      case 'Quoted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Submitted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  addNew() {
    this.router.navigate(['home/reinsurance/facultative/submission/add-facultative-submission'],
      { state: { formType: 'Create Submission' } })
  }

  updateSubmission(refNum: string) {
    this.reinsuranceService.getSubmissionItemDetails(refNum).subscribe(resp => {

    })
  }
}
