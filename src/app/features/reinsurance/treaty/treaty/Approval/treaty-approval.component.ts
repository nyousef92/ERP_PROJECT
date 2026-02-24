import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { TreatyApprovalService } from '@core/services/traty-approval.service';
import { ViewTreatyApprovalComponent } from './view-treaty-approval/view-treaty-approval.component';

interface TreatyApprovalItem {
  treatyCode: string;
  company: string;
  description: string;
  treatyType: string;
  subType: string;
  fromDate: string;
  toDate: string;
  currency: string;
  class: string;
  submittedBy: string;
  submittedDate: string;
  status: string;
  actions: string[];
}

@Component({
  selector: 'app-treaty-approval',
  imports: [CommonModule, BreadcrumbComponent, ModalComponent, InputFieldComponent],
  templateUrl: './treaty-approval.component.html'
})
export class TreatyApprovalComponent implements OnInit {

  @ViewChild('viewModal') viewModal!: ModalComponent;

  breadcumbs = [
    { label: 'Home', url: '/home/dashboard' },
    { label: 'Treaty', url: '/home/reinsurance/treaty' },
    { label: 'Approval', url: '/home/reinsurance/treaty/approval' },
  ];

  treaties: TreatyApprovalItem[] = [];
  searchValue = '';

  constructor(private treatyApprovalService: TreatyApprovalService) { }

  ngOnInit(): void {
    this.treatyApprovalService.treatyMockData.subscribe(data => {
      this.treaties = data;
    });
  }

  get filteredTreaties(): TreatyApprovalItem[] {
    if (!this.searchValue.trim()) return this.treaties;
    const q = this.searchValue.toLowerCase();
    return this.treaties.filter(t =>
      t.treatyCode.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.status.toLowerCase().includes(q)
    );
  }

  updateSearchValue(value: string): void {
    this.searchValue = value;
  }

  getStatusClasses(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending approval':
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  }

  onView(treatyCode: string): void {
    this.viewModal.open(
      ViewTreatyApprovalComponent,
      {
        treatyCode,
        onApproved: () => {
          this.filteredTreaties.map(item => {
            if (item.treatyCode === treatyCode) {
              item.actions = ['view'];
            }
          }
          );
        },
        onRejecteded: () => {
          this.filteredTreaties.map(item => {
            if (item.treatyCode === treatyCode) {
              item.actions = ['view'];
            }
          }
          );
        }
      },
      'xl'
    );
  }

}
