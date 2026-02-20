import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class PlacementService {

  constructor(private helper: HelperService) { }
  
  getPlacementMetrics() {
    // Mock data for progress metrics
    return of([
      {
        label: 'total',
        value: 1,
      },
      {
        label: 'placed',
        value: 4,
      },
      {
        label: 'in progress',
        value: 4,
      },
      {
        label: 'open',
        value: 4,
      },
    ]).pipe(
      map(metrics => metrics.map(metric => ({
        ...metric,
        ...this.helper.getPlacementIcon(metric.label)
      })))
    )
  }

}
