import { Component, effect, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ApprovalService } from '@core/services/approval.service';
import { InputFieldTextareaComponent } from "@shared/input-field-text-area/input-field-text-area.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-approval',
  imports: [NgClass, InputFieldTextareaComponent, FormsModule],
  templateUrl: './review-approval.component.html'
})
export class ReviewApprovalComponent {
  reviewItem = input<any>();
  closed = output<void>();
  status = signal('');
  details = signal<any>(null);
  approveNotes = '';
  touched: boolean = false;


  constructor(private approval: ApprovalService) {
    effect(() => {
      const item = this.reviewItem();
      if (!item) return;
      this.status.set(item.status ?? '');
      this.approval.getApprovalDetails(item.refNom).subscribe((res) => {
        this.details.set({ ...res, ...item });
      });
    });
  }

  get statusLabel(): string {
    const map: Record<string, string> = {
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected'
    };
    return map[this.status()] ?? this.status();
  }

  get statusClass(): string {
    const map: Record<string, string> = {
      approved: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
    };
    return map[this.status()] ?? 'bg-gray-100 text-gray-700 border-gray-200';
  }

  get statusIcon(): string {
    const map: Record<string, string> = {
      approved: 'check_circle',
      pending: 'schedule',
      rejected: 'cancel'
    };
    return map[this.status()] ?? 'help';
  }

  reject() {
    if (this.approveNotes.trim()) {

      this.approval.reject(this.details()?.refNom, this.approveNotes).subscribe(() => {
        this.close();
      });
    }
    this.touched = true;
  }
  approve() {
    if (this.approveNotes.trim()) {
      this.approval.approve(this.details()?.refNom, this.approveNotes).subscribe(() => {
        this.close();
      });
    }
    this.touched = true;
  }
  close() {
    this.closed.emit();
  }
}
