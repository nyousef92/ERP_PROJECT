import { Component, Input, OnInit, OnDestroy, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil, switchMap } from 'rxjs';
import { Metric } from '../../../core/intefaces/metric';
import { DashboardService } from '../../../core/services/dashboard.service';
import { CardsGridComponent } from '../../../shared/cards-grid/cards-grid.component';

@Component({
  selector: 'app-mertic',
  standalone: true,
  imports: [CommonModule,CardsGridComponent],
  templateUrl: './mertic.component.html'
})
export class MerticComponent implements OnInit, OnDestroy {
  @Input() filters = new BehaviorSubject<any>({});
 
  metrics: Metric[] = [];


  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getMetrics()
  }

  getMetrics() {
    this.filters.pipe(
      takeUntil(this.destroy$),
      switchMap(filters => this.dashboardService.getMetric(filters))
    ).subscribe(metrics => this.metrics = metrics);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
