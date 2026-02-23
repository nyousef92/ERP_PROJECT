import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/breadcrumb/breadcrumb.component';
import { ClaimsService } from '@core/services/claims.service';
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: 'app-preview-claim',
  imports: [NgClass, BreadcrumbComponent],
  templateUrl: './preview-claim.component.html'
})
export class PreviewClaimComponent implements OnInit {

  claimNo: string | null;
  claim: any;
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/home' },
    { label: 'Claims', url: '/home/reinsurance/claims' },
    { label: 'Preview Claim' }
  ];

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
      this.claim = data ? { ...data, statusClasses: this.helper.getStatusClass(data.status) } : null;
    });
  }

  goBack() {
    this.router.navigate(['/home/reinsurance/claims']);
  }
}
