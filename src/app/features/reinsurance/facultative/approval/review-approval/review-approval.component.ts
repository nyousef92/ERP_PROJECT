import { Component, Input, OnInit } from '@angular/core';
import { ApprovalService } from '@core/services/approval.service';

@Component({
  selector: 'app-review-approval',
  imports: [],
  templateUrl: './review-approval.component.html'
})
export class ReviewApprovalComponent implements OnInit {

  @Input() reviewItem: any;
  constructor(
    private approval: ApprovalService) {
  }
  
  ngOnInit(): void {
    this.approval.getApprovalDetails(this.reviewItem.refNom).subscribe((res) => {
      this.reviewItem = res;
    });
  }
}
