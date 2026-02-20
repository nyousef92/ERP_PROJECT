import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../../../shared/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-facultative-submission',
  imports: [BreadcrumbComponent],
  templateUrl: './facultative-submission.component.html'
})
export class FacultativeSubmissionComponent {
  breadcumbs = [
    {
      label: 'nav.home',
      url: 'home/dashboard'
    },
    {
      label: 'reinsurance.submissions',
      url: 'home/reinsurance/facultative/submission'
    },
    {
      label: 'reinsurance.createFacultativeSubmission',
      url: 'home/reinsurance/facultative/submission/add-facultative-submission'
    },
  ]
}
