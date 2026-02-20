import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ColoredCardsGridComponent } from "../../../../shared/colored-cards-grid copy/colored-cards-grid.component";
import { ReinsuranceService } from '../../../../core/services/reinsurance.service';
import { NgClass } from '@angular/common';
import { forkJoin } from 'rxjs';
import { InputFieldComponent } from "../../../../shared/input-field/input-field.component";
import { FilterPipe } from '../../../../core/pipes/filter.pipe';

@Component({
    selector: 'app-submission',
    imports: [TranslatePipe, ColoredCardsGridComponent, NgClass, InputFieldComponent, FilterPipe],
    templateUrl: './submission.component.html'
})
export class SubmissionComponent implements OnInit {
  searchText = '';
  metrics: any[] = [];
  history: any[] = [];

  constructor(private reinsuranceService: ReinsuranceService) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.reinsuranceService.getSubmissionMetrics(),
        this.reinsuranceService.getSubmissionHistory({}),
      ]
    ).subscribe(data => {
      this.metrics = data[0];
      this.history = data[1];
    });
  }

  updateSearchValue(value: string) {
    this.searchText = value;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Bound': return 'bg-green-100 text-green-700 border-green-200';
      case 'Quoted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Submitted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
