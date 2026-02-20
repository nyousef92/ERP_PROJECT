import { Component, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from "@shared/breadcrumb/breadcrumb.component";
import { SecurityDetailsComponent } from './security-details/security-details.component';
import { FiscalRegulatoryComponent } from "./fiscal-regulatory/fiscal-regulatory.component";
import { GeneralInformationComponent } from "./general-information/general-information.component";
import { Router } from '@angular/router';
import { LocalStorageCacheService } from '@core/services/local-storage-cache.service';
import { FacultativeService } from '@core/services/facultative.service';

@Component({
  selector: 'app-facultative-submission',
  imports: [BreadcrumbComponent, SecurityDetailsComponent, FiscalRegulatoryComponent, GeneralInformationComponent],
  templateUrl: './facultative-submission.component.html'
})
export class FacultativeSubmissionComponent {
  @ViewChild(GeneralInformationComponent) generalInfo!: GeneralInformationComponent;
  @ViewChild(SecurityDetailsComponent) securityDetails!: SecurityDetailsComponent;
  @ViewChild(FiscalRegulatoryComponent) fiscalRegulatory!: FiscalRegulatoryComponent;

  activeTab = 0;
  formType: string;

  breadcumbs = [
    { label: 'Home', url: '/home/dashboard' },
    { label: 'Submissions', url: '/home/reinsurance/facultative/submission' },
    { label: 'Create Facultative Submission', url: '/home/reinsurance/facultative/submission/add-facultative-submission' },
  ];

  constructor(
    private router: Router,
    private ls: LocalStorageCacheService,
    private facultativeService: FacultativeService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.formType = navigation?.extras.state?.['formType'];
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
