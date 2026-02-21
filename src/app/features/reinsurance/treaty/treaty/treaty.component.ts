import { Component, OnInit, ViewChild } from '@angular/core';
import { ColoredCardsGridComponent } from "@shared/colored-cards-grid/colored-cards-grid.component";
import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { forkJoin, map } from 'rxjs';
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { Router } from '@angular/router';
import { PaginatorComponent } from "@shared/paginator/paginator.component";
import { TreatyService } from '../../../../core/services/treaty.service';
import { PreviewTreatyDetailsComponent } from '../preview-treaty-details/preview-treaty-details.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { ModalOptions } from '@shared/modal/modal.component';
import { AddNewTreatyComponent } from '../add-new-treaty/add-new-treaty.component';
import { EditTreatyComponent } from '../edit-treaty/edit-treaty.component';
import { SendTreatyToApprovalComponent } from '../send-treaty-to-approval/send-treaty-to-approval.component';

@Component({
  selector: 'app-treaty',
  imports: [ColoredCardsGridComponent, NgClass, NgTemplateOutlet, InputFieldComponent, PaginatorComponent, ModalComponent],
  templateUrl: './treaty.component.html'
})
export class TreatyComponent implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  searchText = '';
  metrics: any[] = [];
  history: any[] = [];
  totalItems = 0;

  constructor(
    private treatyService: TreatyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.treatyService.getSubmissionMetrics(),
        this.treatyService.getTreatyHistory({
          pageSize: 6,
          currentPage: 1,
          searchText: this.searchText
        })
      ]
    )
      .subscribe(resp => {
        this.metrics = resp[0];
        this.history = resp[1].data;
        this.totalItems = resp[1].totalItems
      }).unsubscribe();

  }

  updateSearchValue(value: string) {
    this.searchText = value;
    this.getTreatyHistory()
  }

  getTreatyHistory(currentPage = 1) {
    this.treatyService.getTreatyHistory({
      pageSize: 6,
      currentPage,
      searchText: this.searchText
    }).subscribe(resp => {
      this.history = resp.data;
      this.totalItems = resp.totalItems
    }).unsubscribe();

  }

  addNew() {
    this.modal.open(AddNewTreatyComponent, {}, 'xl', { disableBackdropClose: true });
  }

  editTreaty(treatyId: string) {
    this.modal.open(EditTreatyComponent, { treatyId }, 'xl', { disableBackdropClose: true });
  }

  renewSubmission(refNum: string) {
    this.router.navigate(
      ['home/reinsurance/facultative/submission/add-facultative-submission', refNum],
      { queryParams: { formType: 'Renew' } }
    );
  }

  openDetails(refNumber: string) {
    this.modal.open(PreviewTreatyDetailsComponent, {
      refNumber,
    }, 'md')
  }

  deleteTreaty(id: string): void {
    const item = this.history.find(x => x.id === id);

    console.log(item);

    this.history = this.history.filter(x => x.id !== id);
    this.totalItems--;

    this.treatyService.deleteTreaty(id).subscribe((response) => {
      if (response.success) {
        console.log(response);
        this.getTreatyHistory();
        return;
      }

      this.history.push(item);
      this.totalItems++;

    }).unsubscribe();
  }

  submitToApproval(id: string): void {
    this.modal.open(SendTreatyToApprovalComponent, { refNumber: id }, 'md');
  }

  postToFinance(id: string): void {
    this.treatyService.postToFinance(id).subscribe(resp => {
      if (resp.success) {
        this.getTreatyHistory();
      }
    }).unsubscribe();
  }
}
