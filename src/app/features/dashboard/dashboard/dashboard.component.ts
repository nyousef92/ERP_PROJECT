import { Component } from '@angular/core';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { BehaviorSubject } from 'rxjs';
import { MerticComponent } from '../mertic/mertic.component';
import { ChartsComponent } from '../charts/charts.component';
import { ActivitiesComponent } from '../activities/activities.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterComponent, MerticComponent, ChartsComponent, ActivitiesComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  filters = new BehaviorSubject<any>({});
  onFilterChanges(filters: any) {
    this.filters.next(filters)
  }
}
