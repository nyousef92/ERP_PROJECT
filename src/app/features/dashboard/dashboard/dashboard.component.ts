import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MerticComponent } from '../mertic/mertic.component';
import { ChartsComponent } from '../charts/charts.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { DshboardFilterComponent } from '../dashboard-filter/dashboard-filter.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DshboardFilterComponent, MerticComponent, ChartsComponent, ActivitiesComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  filters = new BehaviorSubject<any>({});
  onFilterChanges(filters: any) {
    this.filters.next(filters)
  }
}
