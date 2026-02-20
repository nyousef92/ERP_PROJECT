import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { ProgressSheetDocumentsComponent } from '../progress-sheet-documents/progress-sheet-documents.component';
import { SubmissionService } from '@core/services/submission.service';

@Component({
  selector: 'app-preview-facultative-progress-sheet',
  imports: [CurrencyPipe, ProgressSheetDocumentsComponent, NgStyle],
  templateUrl: './preview-facultative-progress-sheet.component.html'
})
export class PreviewFacultativeProgressSheetComponent implements OnInit {

  refNumber: string | null;
  progressSheet: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {
    this.refNumber = this.route.snapshot.paramMap.get('refNumber');
  }

  ngOnInit(): void {
    if (this.refNumber) {
      this.submissionService.getProgressSheetPreview(this.refNumber).subscribe((data) => {
        this.progressSheet = data;
        this.progressSheet.progress =
          this.progressSheet.progress.toLowerCase() === 'submitter' ? 25
            : this.progressSheet.progress.toLowerCase() === 'Quoted' ? 50
              : this.progressSheet.progress.toLowerCase() === 'bound' ? 75
                : 100;
      });
    }
  }

  onDocumentsUploaded(files: File[]) {
    this.progressSheet.documents = [...this.progressSheet.documents, ...files];
  }

  editSubmission() {
    this.router.navigate(
      ['home/reinsurance/facultative/submission/add-facultative-submission', this.refNumber],
      { queryParams: { formType: 'Update Submission' } }
    );
  }

  editProgressSheet() {
    this.router.navigate(
      ['home/reinsurance/facultative/progress-sheet/view-facultative-progress-sheet', this.refNumber]);
  }
}
