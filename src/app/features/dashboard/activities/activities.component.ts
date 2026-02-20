import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil, switchMap } from 'rxjs';
import { INotification } from '../../../core/intefaces/notification';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  @Input() filters = new BehaviorSubject<any>({});

  activities: INotification[] = [];

  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.filters.pipe(
      takeUntil(this.destroy$),
      switchMap(filters => this.dashboardService.getActivities(filters))
    ).subscribe(activities => this.activities = activities);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
