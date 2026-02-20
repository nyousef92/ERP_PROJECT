import { Component, OnInit, ViewChild } from '@angular/core';
import { FacultativeService } from '@core/services/facultative.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/breadcrumb/breadcrumb.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { EditReinsuranceComponent } from './edit-reinsurance/edit-reinsurance.component';

@Component({
  selector: 'app-view-facultative-progress-sheet',
  imports: [BreadcrumbComponent, ModalComponent],
  templateUrl: './view-facultative-progress-sheet.component.html'
})
export class ViewFacultativeProgressSheetComponent implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent;

  refNumber: string | null;
  progressSheet: any;
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/home' },
    { label: 'Facultative', url: '/home/reinsurance/facultative' },
    { label: 'View Progress Sheet' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facultativeService: FacultativeService
  ) {
    this.refNumber = this.route.snapshot.paramMap.get('refNumber');
  }

  ngOnInit(): void {
    this.facultativeService.getProgressSheetDetailsView(this.refNumber || '').subscribe((data) => {
      this.progressSheet = data;
    });
  }

  goBack() {
    this.router.navigate(
      ['home/reinsurance/facultative/progress-sheet/preview-facultative-progress-sheet', this.refNumber]
    );
  }

  editProgressSheet() {}

  editReinsurer(reinsurer: any, index: number) {
    this.modal.open(EditReinsuranceComponent, {
      reinsurer,
      onSaved: (updated: any) => {
        this.progressSheet.reinsurers = this.progressSheet.reinsurers.map(
          (r: any, i: number) => i === index ? { ...r, ...updated } : r
        );
      },
      onDelete: () => {
        this.progressSheet.reinsurers.splice(index, 1);
      }
    });
  }

  deleteReinsurer(index: number) {
    this.progressSheet.reinsurers.splice(index, 1);
  }

  addReinsurer() {
    this.modal.open(EditReinsuranceComponent, {
      reinsurer: null,
      onSaved: (updated: any) => {
        this.progressSheet.reinsurers.push(updated);
      }
    });
  }

}
