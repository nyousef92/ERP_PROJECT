import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreatyService } from '../../../../core/services/treaty.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-send-treaty-to-approval',
  imports: [NgClass, DatePipe],
  templateUrl: './send-treaty-to-approval.component.html'
})
export class SendTreatyToApprovalComponent implements OnInit {
  @Input() refNumber: any;
  treatyService = inject(TreatyService);
  treatyDetails!: any;

  close!: () => void;

  ngOnInit(): void {
    console.log(this.refNumber);
    if (this.refNumber) {
      this.loadTreatyDetails(this.refNumber);
    }
  }

  onCancel(): void {
    this.close();
  }

  private loadTreatyDetails(refNumber: any): void {
    this.treatyService.getTreatyDetails(refNumber).subscribe(resp => {
      this.treatyDetails = resp;
    });
  }

  submitToApproval() {
    this.treatyService.submitToApproval(this.refNumber).subscribe(resp => {
      if (resp.success) {
        this.close();
      }
    });
  }
}

