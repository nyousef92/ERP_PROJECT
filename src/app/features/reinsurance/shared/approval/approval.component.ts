import { Component, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ApprovalService } from '@core/services/approval.service';
import { forkJoin } from 'rxjs';
import { InputFieldComponent } from "@shared/input-field/input-field.component";
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '@core/pipes/filter.pipe';
import { ReviewApprovalComponent } from "./review-approval/review-approval.component";
import { ActivatedRoute } from '@angular/router';

export enum ApprovalFilter {
  All = 'all',
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

@Component({
  selector: 'app-approval',
  imports: [NgClass, InputFieldComponent, FormsModule, FilterPipe, ReviewApprovalComponent],
  templateUrl: './approval.component.html'
})
export class ApprovalComponent implements OnInit {
  sheetType: 'life' | 'facultative' | null = null;
  headerTitle: string;
  subHeader: string;

  constructor(
    private approvalservice: ApprovalService,
    private route: ActivatedRoute
  ) {
    this.sheetType = this.route.snapshot.data['sheetType'] ?? null;
    this.headerTitle = this.sheetType === 'facultative' ? 'Placement Approval' : 'Life Placement Approval';
    this.subHeader = this.sheetType === 'facultative' ? ' Review and approve placement transactions' : 'Review and approve life reinsurance placement transactions';
  }

  activeFilter: ApprovalFilter = ApprovalFilter.All;
  searchValue = '';
  filters: any[] = [];
  historyList: any[] = [];
  reviewItem = signal<any>(null);


  ngOnInit(): void {
    forkJoin(
      {
        statuses: this.approvalservice.getStatuses(),
        history: this.approvalservice.getApprovalsHistory({ status: 0 })
      }
    ).subscribe(({ statuses, history }) => {
      this.filters = statuses.map((status: any) => ({
        ...status,
        key: status.key as ApprovalFilter,
        label: status.label
      }));
      this.historyList = history.map(item => ({ ...item, class: this.getStatusClass(item.status) }));
    });
  }

  getStatusClass(status: any): string {
    status = status === 'approved' ?
      ApprovalFilter.Approved :
      status === 'pending' ?
        ApprovalFilter.Pending :
        ApprovalFilter.Rejected;

    return this.getStatusFonts(status);
  }

  setStatus(key: any) {
    this.activeFilter = key.key;
    this.approvalservice.getApprovalsHistory({ status: key.id }).subscribe(history => {
      this.historyList = history;
    });
  }

  buttonClass(key: ApprovalFilter): string {
    if (this.activeFilter !== key) {
      return 'bg-background border-border text-text-secondary hover:border-primary hover:text-primary';
    }
    switch (key) {
      case ApprovalFilter.All: return 'bg-primary border-primary text-white';
      case ApprovalFilter.Pending: return 'bg-warning border-warning text-white';
      case ApprovalFilter.Approved: return 'bg-success border-success text-white';
      case ApprovalFilter.Rejected: return 'bg-danger border-danger  text-white';
    }

  }

  getStatusFonts(status: string): string {
    switch (status) {
      case ApprovalFilter.Approved: return 'bg-green-100 text-green-700 border-green-200';
      case ApprovalFilter.All: return 'bg-blue-100 text-blue-700 border-blue-200';
      case ApprovalFilter.Pending: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case ApprovalFilter.Rejected: return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  getNumberOfTransactions(status: ApprovalFilter): number {
    if (status === ApprovalFilter.All) {
      return this.historyList.length;
    } else {
      return this.historyList.filter(item => item.status === status).length;
    }
  }

  reviewPlacement(placement: any) {
    this.reviewItem.set(placement);
  }
}
