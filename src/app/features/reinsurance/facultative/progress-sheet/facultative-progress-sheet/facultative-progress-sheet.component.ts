import { Component, OnInit } from '@angular/core';
import { FacultativeService } from '@core/services/facultative.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProgressSheetDocumentsComponent } from '../progress-sheet-documents/progress-sheet-documents.component';

@Component({
  selector: 'app-facultative-progress-sheet',
  imports: [CurrencyPipe, ProgressSheetDocumentsComponent],
  templateUrl: './facultative-progress-sheet.component.html'
})
export class FacultativeProgressSheetComponent implements OnInit {

  refNumber: string | null;
  progressSheet: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facultativeService: FacultativeService
  ) {
    this.refNumber = this.route.snapshot.paramMap.get('refNumber');
  }

  ngOnInit(): void {
    if (this.refNumber) {
      this.facultativeService.getProgressSheet(this.refNumber).subscribe((data) => {
        this.progressSheet = data;
      });
    }
  }

  onDocumentsUploaded(files: File[]) {
    this.progressSheet.documents = [...this.progressSheet.documents, ...files];
  }
}
