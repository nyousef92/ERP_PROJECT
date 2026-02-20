import { Component, Input, OnInit, OnDestroy, model, signal } from '@angular/core';

import { BehaviorSubject, Subject, takeUntil, switchMap, map } from 'rxjs';
import { Metric } from '@core/intefaces/metric';
import { DashboardService } from '@core/services/dashboard.service';
import { CardsGridComponent } from '@shared/cards-grid/cards-grid.component';
import { HelperService } from '@core/services/helper.service';

@Component({
    selector: 'app-mertic',
    imports: [CardsGridComponent],
    templateUrl: './mertic.component.html'
})
export class MerticComponent implements OnInit, OnDestroy {
  @Input() filters = new BehaviorSubject<any>({});

  metrics: Metric[] = [];


  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService,
    private helper: HelperService) { }

  ngOnInit(): void {
    this.getMetrics()
  }

  getMetrics() {
    this.filters.pipe(
      takeUntil(this.destroy$),
      switchMap(filters => this.dashboardService.getMetric(filters)),
      map((items: any[]) => {
        return items.map(
          (item => ({
            ...item,
            ...this.helper.getTrendConfig(item.iconType),
            icon: this.helper.getIcon(item.iconType)
          })
          ))
      }
      )
    ).subscribe(metrics => this.metrics = metrics);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
