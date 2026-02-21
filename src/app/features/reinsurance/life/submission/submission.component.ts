import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '@core/services/helper.service';
import { LifeSubmissionService } from '@core/services/life.submission.service';
import { ColoredCardsGridComponent } from '@shared/colored-cards-grid/colored-cards-grid.component';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { PaginatorComponent } from '@shared/paginator/paginator.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-submission',
  imports: [ColoredCardsGridComponent,
    InputFieldComponent,
    PaginatorComponent,
    NgClass
  ],
  templateUrl: './submission.component.html'
})
export class SubmissionComponent implements OnInit {

  searchText = '';
  metrics: any[] = [];
  history: any[] = [];
  totalItems = 0;

  constructor(
    private submissionService: LifeSubmissionService,
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
      ));
      this.totalItems = data[1].totalItems;
    });
  }



  addNew() {
    this.router.navigate(['home/reinsurance/life/submission/add-life-submission']);
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

  updateSubmission(refNum: string) {
    this.router.navigate(
      ['home/reinsurance/life/submission/add-life-submission', refNum],
      { queryParams: { formType: 'Update Submission' } }
    );
  }

  renewSubmission(refNum: string) {
    this.router.navigate(
      ['home/reinsurance/life/submission/add-life-submission', refNum],
      { queryParams: { formType: 'Renew' } }
    );
  }
}
