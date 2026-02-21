import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreatyService } from '../../../../core/services/treaty.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-preview-treaty-details',
  imports: [NgClass, DatePipe],
  templateUrl: './preview-treaty-details.component.html'
})
export class PreviewTreatyDetailsComponent implements OnInit {
  @Input() refNumber: any;
  treatyService = inject(TreatyService);
  treatyDetails!: any;

  close!: () => void;

  ngOnInit(): void {
    console.log(this.refNumber);
    if (this.refNumber) {
      this.loadTreatyDetails(this.refNumber);
    }
  }

  onCancel(): void {
    this.close();
  }

  private loadTreatyDetails(refNumber: any): void {
    this.treatyService.getTreatyDetails(refNumber).subscribe(resp => {
      this.treatyDetails = resp;
    });
  }
}

