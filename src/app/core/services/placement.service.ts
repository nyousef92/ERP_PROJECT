import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

const placementClasses: Record<string, { trendIcon: string, trendColorClass: string, cardClass: string, labelClass: string, valueClass: string }> = {
  ['total']: {
    trendIcon: 'description',
    trendColorClass: 'text-blue-600',
    cardClass: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    labelClass: 'text-blue-700',
    valueClass: 'text-blue-900',
  },
  ['placed']: {
    trendIcon: 'check_circle',
    trendColorClass: 'text-green-600',
    cardClass: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    labelClass: 'text-green-700',
    valueClass: 'text-green-900',
  },
  ['open']: {
    trendIcon: 'error_outline',
    trendColorClass: 'text-sky-600',
    cardClass: 'bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200',
    labelClass: 'text-sky-700',
    valueClass: 'text-sky-900',
  },
  ['in progress']: {
    trendIcon: 'schedule',
    trendColorClass: 'text-yellow-600',
    cardClass: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
    labelClass: 'text-yellow-700',
    valueClass: 'text-yellow-900',
  }
};

@Injectable({
  providedIn: 'root',
})
export class PlacementService {

  constructor() { }
  
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
        ...placementClasses[metric.label]
      })))
    )
  }

}
