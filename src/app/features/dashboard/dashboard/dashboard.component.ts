import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MerticComponent } from '../mertic/mertic.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { DshboardFilterComponent } from '../dashboard-filter/dashboard-filter.component';
import { ChartsComponent } from "../charts/charts.component";

@Component({
    selector: 'app-dashboard',
    imports: [DshboardFilterComponent, MerticComponent, ActivitiesComponent, ChartsComponent],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  filters = new BehaviorSubject<any>({});
  onFilterChanges(filters: any) {
    this.filters.next(filters)
  }
}
