import { Component, OnInit } from '@angular/core';
import { ColoredCardsGridComponent } from "@shared/colored-cards-grid/colored-cards-grid.component";
import { NgClass } from '@angular/common';
import { forkJoin } from 'rxjs';
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { Router } from '@angular/router';
import { PaginatorComponent } from "@shared/paginator/paginator.component";
import { FacultativeSubmissionService } from '@core/services/facultative.submission.service';
import { HelperService } from '@core/services/helper.service';

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
    private submissionService: FacultativeSubmissionService,
    private router: Router,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.submissionService.getSubmissionMetrics(),
        this.submissionService.getSubmissionHistory({
          pageSize: 6,
          currentPage: 1,
          searchText: this.searchText
        })
      ]
    ).subscribe(data => {
      this.metrics = data[0];
      this.history = data[1].data.map(item => (
        { ...item, statusClasses: this.helper.getStatusClass(item.status) }
      ));;
      this.totalItems = data[1].totalItems;
    });
  }

  updateSearchValue(value: string) {
    this.searchText = value;
    this.getSubmissionHistory()
  }

  getSubmissionHistory(currentPage = 1) {
    this.submissionService.getSubmissionHistory({
      pageSize: 6,
      currentPage,
      searchText: this.searchText
    }).subscribe(resp => {
      this.history = resp.data.map(item => (
        { ...item, statusClasses: this.helper.getStatusClass(item.status) }
      ));
      this.totalItems = resp.totalItems
    }).unsubscribe();

  }

  addNew() {
    this.router.navigate(['home/reinsurance/facultative/submission/add-facultative-submission']);
  }

  updateSubmission(refNum: string) {
    this.router.navigate(
      ['home/reinsurance/facultative/submission/add-facultative-submission', refNum],
      { queryParams: { formType: 'Update Submission' } }
    );
  }

  renewSubmission(refNum: string) {
    this.router.navigate(
      ['home/reinsurance/facultative/submission/add-facultative-submission', refNum],
      { queryParams: { formType: 'Renew' } }
    );
  }

  goToProgressSheet(refNum: string) {
    this.router.navigate(
      ['home/reinsurance/facultative/progress-sheet/preview-facultative-progress-sheet', refNum]);
  }
}
