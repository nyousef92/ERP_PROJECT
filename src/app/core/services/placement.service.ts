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
  getPlacementList(arg0: {}) {
    return of({
      totalItems: 20,
      data: [
        {
          refNo: "FAC-2024-001",
          cedant: "ACME Insurance Co.",
          type: "XOL",
          status: "Placed",
          lastUpdated: "2023-10-15"
        },
        {
          refNo: "FAC-2024-002",
          cedant: "Secure Insurers",
          type: "Quota Share",
          status: "In Progress",
          lastUpdated: "2023-10-18"
        },
        {
          refNo: "FAC-2024-003",
          cedant: "Guardian General",
          type: "Surplus",
          status: "Open",
          lastUpdated: "2023-10-20"
        },
        {
          refNo: "FAC-2024-004",
          cedant: "National Coverage",
          type: "XOL",
          status: "Open",
          lastUpdated: "2023-10-21"
        },
        {
          refNo: "FAC-2024-005",
          cedant: "Premier Insurance",
          type: "Quota Share",
          status: "Placed",
          lastUpdated: "2023-10-12"
        }
      ]
    });
  }

  constructor() { }

  getPlacementStatuses() {
    return of([
      { id: 0, name: 'all' },
      { id: 1, name: 'open' },
      { id: 2, name: 'in progress' },
      { id: 3, name: 'placed' },
    ])
  }

  getPlacementTypes() {
    return of([
      { id: 0, name: 'all' },
      { id: 1, name: 'Quota Share' },
      { id: 2, name: 'Surplus Share' },
      { id: 3, name: 'Excess of Loss' },
    ])
  }

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
