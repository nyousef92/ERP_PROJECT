import { Component, signal } from '@angular/core';
import { BreadcrumbComponent } from "@shared/breadcrumb/breadcrumb.component";
import { SecurityDetailsComponent } from './security-details/security-details.component';
import { FiscalRegulatoryComponent } from "./fiscal-regulatory/fiscal-regulatory.component";
import { GeneralInformationComponent } from "./general-information/general-information.component";
import { Router } from '@angular/router';
import { LocalStorageCacheService } from '@core/services/local-storage-cache.service';
@Component({
  selector: 'app-facultative-submission',
  imports: [BreadcrumbComponent, SecurityDetailsComponent, FiscalRegulatoryComponent, GeneralInformationComponent,],
  templateUrl: './facultative-submission.component.html'
})
export class FacultativeSubmissionComponent {
  activeTab = 0;
  collectData = signal(false);
  collectedData = {
    "generalInfo": {},
    "securityDetails": {},
    "fiscalRegulatory": {},
  };
  formType: string;

  breadcumbs = [
    {
      label: 'Home',
      url: '/home/dashboard'
    },
    {
      label: 'Submissions',
      url: '/home/reinsurance/facultative/submission'
    },
    {
      label: 'Create Facultative Submission',
      url: '/home/reinsurance/facultative/submission/add-facultative-submission'
    },
  ]

  constructor(private router: Router,
    private ls: LocalStorageCacheService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.formType = navigation?.extras.state?.['formType'];
  }

  isActive(index: number): boolean {
    return this.activeTab === index;
  }

  saveClicked(data: any, key: string) {
    if (data.type === 'submit') {
      this.collectData.update(v => true);
      (this.collectedData as any)[key] = data.value;
    }
    else {
      this.ls.set('FacultativeSubmission', data.value, 'submission')
    }
  }

}
