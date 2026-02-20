import { Component, signal } from '@angular/core';
import { BreadcrumbComponent } from "@shared/breadcrumb/breadcrumb.component";
import { SecurityDetailsComponent } from './security-details/security-details.component';
import { FiscalRegulatoryComponent } from "./fiscal-regulatory/fiscal-regulatory.component";
import { GeneralInformationComponent } from "./general-information/general-information.component";
@Component({
  selector: 'app-facultative-submission',
  imports: [BreadcrumbComponent, SecurityDetailsComponent, FiscalRegulatoryComponent, GeneralInformationComponent,],
  templateUrl: './facultative-submission.component.html'
})
export class FacultativeSubmissionComponent {
  activeTab = 0;
  collectData = signal(false);

  isActive(index: number): boolean {
    return this.activeTab === index;
  }

  breadcumbs = [
    {
      label: 'Home',
      url: 'home/dashboard'
    },
    {
      label: 'Submissions',
      url: 'home/reinsurance/facultative/submission'
    },
    {
      label: 'Create Facultative Submission',
      url: 'home/reinsurance/facultative/submission/add-facultative-submission'
    },
  ]
}
