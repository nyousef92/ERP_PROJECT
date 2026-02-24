import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimsService } from '@core/services/claims.service';
import { HelperService } from '@core/services/helper.service';
import { ModalComponent } from "@shared/modal/modal.component";
import { ReviewApproveClaimComponent } from './review-approve-claim/review-approve-claim.component';
import { ReinsurerHistoryComponent } from './reinsurer-history/reinsurer-history.component';
import { UpdateReinsurerComponent } from './update-reinsurer/update-reinsurer.component';

@Component({
  selector: 'app-preview-claim',
  imports: [ModalComponent],
  templateUrl: './preview-claim.component.html'
})
export class PreviewClaimComponent implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent;

  claimNo: string | null;
  claim: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private claimsService: ClaimsService,
    public helper: HelperService
  ) {
    this.claimNo = this.route.snapshot.paramMap.get('claimNo');
  }

  ngOnInit(): void {
    this.claimsService.getClaimDetails(this.claimNo || '').subscribe(data => {
      this.claim = data;
      this.claim.classes = this.helper.getStatusClass(this.claim.status);
      this.claim.reinsurerLines = this.claim.reinsurerLines
        .map((item: any) => ({ ...item, classes: this.helper.getStatusClass(item.status) }));
    });
  }

  goBack() {
    this.router.navigate(['/home/reinsurance/claims']);
  }

  reviewAndApprove() {
    this.modal.open(ReviewApproveClaimComponent, { claim: this.claim }, 'md');
  }

  viewReinsurerHistory(reinsurer: any) {
    this.modal.open(ReinsurerHistoryComponent, { reinsurer });
  }

  updateReinsurer(reinsurer: any) {
    this.modal.open(UpdateReinsurerComponent, {
      reinsurer,
      onSaved: (formValue: any) => {
        reinsurer.status = formValue.status??reinsurer.status;
        reinsurer.approvedAmount = formValue.approvedAmount??reinsurer.approvedAmount;
        this.claim.reinsurerLines = [...this.claim.reinsurerLines]
          .map((item: any) => ({ ...item, classes: this.helper.getStatusClass(item.status) }));
      }
    });
  }

}
