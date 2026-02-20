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
      label: 'home',
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
