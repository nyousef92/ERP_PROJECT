import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../../../shared/breadcrumb/breadcrumb.component";
import { SecurityDetailsComponent } from './security-details/security-details.component';
@Component({
  selector: 'app-facultative-submission',
  imports: [BreadcrumbComponent, SecurityDetailsComponent],
  templateUrl: './facultative-submission.component.html'
})
export class FacultativeSubmissionComponent {
  activeTab = 0;

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
