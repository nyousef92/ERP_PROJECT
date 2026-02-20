import { Component, OnInit } from '@angular/core';
import { FacultativeService } from '@core/services/facultative.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-facultative-progress-sheet',
  imports: [],
  templateUrl: './view-facultative-progress-sheet.component.html'
})
export class ViewFacultativeProgressSheetComponent implements OnInit {

  refNumber: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facultativeService: FacultativeService
  ) {
    this.refNumber = this.route.snapshot.paramMap.get('refNumber');
  }

  ngOnInit(): void {
    return this.facultativeService.getProgressSheetDetailsView(this.refNumber || '').subscribe((data) => {
      // Handle the data for view mode
    });
  }

}
