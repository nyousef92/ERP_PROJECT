import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subject, takeUntil, switchMap } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { DashboardService } from '../../../core/services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  imports: [BaseChartDirective],
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit, OnDestroy {
  @Input() filters = new BehaviorSubject<any>({});

  private destroy$ = new Subject<void>();

  submissionsChart: ChartConfiguration<'bar'> = { type: 'bar', data: { labels: [], datasets: [] } };
  claimsChart: ChartConfiguration<'doughnut'> = { type: 'doughnut', data: { labels: [], datasets: [] } };
  treatyChart: ChartConfiguration<'pie'> = { type: 'pie', data: { labels: [], datasets: [] } };
  employeeChart: ChartConfiguration<'line'> = { type: 'line', data: { labels: [], datasets: [] } };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
     this.getCharts();
  }

  getCharts() {
    this.filters.pipe(
      takeUntil(this.destroy$),
      switchMap(filters => this.dashboardService.getCharts(filters))
    ).subscribe(data => this.buildCharts(data));
  }

  private buildCharts(data: any) {
    this.submissionsChart = {
      type: 'bar',
      data: {
        labels: data.monthlySubmissions.labels,
        datasets: data.monthlySubmissions.datasets.map((ds: any, i: number) => ({
          label: ds.label,
          data: ds.data,
          backgroundColor: i === 0 ? 'rgba(59, 130, 246, 0.7)' : 'rgba(16, 185, 129, 0.7)',
          borderRadius: 4,
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true } }
      }
    };

    this.claimsChart = {
      type: 'doughnut',
      data: {
        labels: data.claimsByStatus.labels,
        datasets: [{
          data: data.claimsByStatus.data,
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6366f1']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    };

    this.treatyChart = {
      type: 'pie',
      data: {
        labels: data.treatyDistribution.labels,
        datasets: [{
          data: data.treatyDistribution.data,
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    };

    this.employeeChart = {
      type: 'line',
      data: {
        labels: data.employeeGrowth.labels,
        datasets: data.employeeGrowth.datasets.map((ds: any) => ({
          label: ds.label,
          data: ds.data,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          fill: true,
          tension: 0.3,
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: false } }
      }
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
