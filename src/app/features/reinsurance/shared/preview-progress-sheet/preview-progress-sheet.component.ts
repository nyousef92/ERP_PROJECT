import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { FacultativeSubmissionService } from '@core/services/facultative.submission.service';
import { ProgressSheetDocumentsComponent } from "../progress-sheet-documents/progress-sheet-documents.component";
import { SharedService } from '@core/services/shared.service';

@Component({
  selector: 'app-preview-progress-sheet',
  imports: [CurrencyPipe, NgStyle, ProgressSheetDocumentsComponent],
  templateUrl: './preview-progress-sheet.component.html'
})
export class PreviewProgressSheetComponent implements OnInit {

  refNumber: string | null;
  sheetType: string | null;
  progressSheet: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private submissionService: FacultativeSubmissionService,
    private shared: SharedService
  ) {
    this.refNumber = this.route.snapshot.paramMap.get('refNumber');
    this.sheetType = this.route.snapshot.data['sheetType'];
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
    const rout = this.sheetType == 'facultative' ?
      'home/reinsurance/facultative/submission/add-facultative-submission' :
      'home/reinsurance/life/submission/add-life-submission'

    this.router.navigate(
      [rout, this.refNumber],
      { queryParams: { formType: 'Update Submission' } }
    );
  }

  editProgressSheet() {
    const route = this.sheetType === 'life'
      ? 'home/reinsurance/life/progress-sheet/view-life-progress-sheet'
      : 'home/reinsurance/facultative/progress-sheet/view-facultative-progress-sheet';
    this.router.navigate([route, this.refNumber]);
  }

  generatePDF(): void {
    this.shared.generatePDF('contentToExport', `${this.sheetType} progress Sheet ${this.refNumber}`)
  }

}
