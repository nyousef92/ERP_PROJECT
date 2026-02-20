import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BreadcrumbComponent } from "@shared/breadcrumb/breadcrumb.component";
import { SecurityDetailsComponent } from './security-details/security-details.component';
import { FiscalRegulatoryComponent } from "./fiscal-regulatory/fiscal-regulatory.component";
import { GeneralInformationComponent } from "./general-information/general-information.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageCacheService } from '@core/services/local-storage-cache.service';
import { FacultativeService } from '@core/services/facultative.service';
import { ReinsuranceService } from '@core/services/reinsurance.service';

@Component({
  selector: 'app-facultative-submission',
  imports: [BreadcrumbComponent, SecurityDetailsComponent, FiscalRegulatoryComponent, GeneralInformationComponent],
  templateUrl: './facultative-submission.component.html'
})
export class FacultativeSubmissionComponent implements AfterViewInit {
  @ViewChild(GeneralInformationComponent) generalInfo!: GeneralInformationComponent;
  @ViewChild(SecurityDetailsComponent) securityDetails!: SecurityDetailsComponent;
  @ViewChild(FiscalRegulatoryComponent) fiscalRegulatory!: FiscalRegulatoryComponent;

  activeTab = 0;
  formType: string;
  private refNumber: string | null;

  breadcumbs = [
    { label: 'Home', url: '/home/dashboard' },
    { label: 'Submissions', url: '/home/reinsurance/facultative/submission' },
    { label: 'Create Facultative Submission', url: '/home/reinsurance/facultative/submission/add-facultative-submission' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageCacheService,
    private facultativeService: FacultativeService,
    private reinsuranceService: ReinsuranceService
  ) {
    this.refNumber = this.route.snapshot.paramMap.get('refNumber');
    this.formType = this.route.snapshot.queryParamMap.get('formType') ?? 'Create Submission';
  }

  ngAfterViewInit(): void {
    if (this.refNumber) {
      this.reinsuranceService.getSubmissionItemDetails(this.refNumber).subscribe(resp => {
        this.generalInfo.form.patchValue(resp.generalInfo);
        this.securityDetails.form.patchValue(resp.securityDetails);
        this.fiscalRegulatory.form.patchValue(resp.fiscalRegulatory);
      });
    }
  }

  isActive(index: number): boolean {
    return this.activeTab === index;
  }

  private getAllData() {
    return {
      generalInfo: { ...this.generalInfo.form.value },
      securityDetails: { ...this.securityDetails.form.value },
      fiscalRegulatory: { ...this.fiscalRegulatory.form.value },
    };
  }

  onSave(): void {
    this.facultativeService.saveFacultativeSubmission(this.getAllData());
  }

  onSaveDraft(): void {
    this.ls.set('FacultativeSubmission', this.getAllData(), 'submission');
  }

  onCancel(): void {
    this.router.navigate(['/home/reinsurance/facultative/submission']);
  }
}
