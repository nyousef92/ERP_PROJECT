import { Component, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { SecurityDetailsComponent } from "./security-details/security-details.component";
import { FiscalAndRegulatoryComponent } from "./fiscal-and-regulatory/fiscal-and-regulatory.component";
import { FacultativeSubmissionService } from '@core/services/facultative.submission.service';
import { LocalStorageCacheService } from '@core/services/local-storage-cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-life-submission',
  imports: [
    BreadcrumbComponent,
    GeneralInformationComponent,
    SecurityDetailsComponent,
    FiscalAndRegulatoryComponent
  ],
  templateUrl: './add-life-submission.component.html'
})
export class AddLifeSubmissionComponent {
  @ViewChild(GeneralInformationComponent) generalInfo!: GeneralInformationComponent;
  @ViewChild(SecurityDetailsComponent) securityDetails!: SecurityDetailsComponent;
  @ViewChild(FiscalAndRegulatoryComponent) fiscalRegulatory!: FiscalAndRegulatoryComponent;

  breadcumbs = [
    { label: 'Home', url: '/home/dashboard' },
    { label: 'Submissions', url: '/home/reinsurance/life/submission' },
    { label: 'Create Facultative Submission', url: '/home/reinsurance/life/submission/add-life-submission' },
  ];

  activeTab = 0;
  constructor(
    private submissionService: FacultativeSubmissionService,
    private ls: LocalStorageCacheService,
    private router: Router
  ) { }
  isActive(index: number): boolean {
    return this.activeTab === index;
  }

  onSave(): void {
    this.submissionService.saveFacultativeSubmission(this.getAllData()).subscribe();
  }

  onSaveDraft(): void {
    this.ls.set('fileSubmission', this.getAllData(), 'submission');
  }

  onCancel(): void {
    this.router.navigate(['/home/reinsurance/file/submission']);
  }

  private getAllData() {
    return {
      generalInfo: { ...this.generalInfo.form.value },
      securityDetails: { ...this.securityDetails.form.value },
      fiscalRegulatory: { ...this.fiscalRegulatory.form.value },
    };
  }

}
