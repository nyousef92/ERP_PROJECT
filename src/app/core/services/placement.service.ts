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

  deletePlacement(refNo: string) {
    return of(true);
  }

  getPlacementDeatils(refNom: string) {
    return of({
      refNo: refNom,
      cedant: 'ACME Insurance Co.',
      status: 'In Progress',
      placementName: 'Global Property Excess of Loss 2024',
      sumInsured: '25,000,000',
      rate: '0.75',
      currency: 'USD',
      grossPremium: '187,500',
      cedingCommission: '12.5',
      uibShare: '25',
      netPremium: '140,625',
      npos: '1,250',
      securities: [
        { security: 'Swiss Re', share: '25.00', riRate: '5.00', riPremium: '1,250,000', riComm: '125,000', riTax: '0.00', netRiPremium: '1,125,000' },
        { security: 'Munich Re', share: '20.00', riRate: '5.00', riPremium: '1,000,000', riComm: '100,000', riTax: '0.00', netRiPremium: '900,000' },
        { security: 'Hannover Re', share: '15.00', riRate: '5.00', riPremium: '750,000', riComm: '75,000', riTax: '0.00', netRiPremium: '675,000' },
      ],
    });
  }

  addNewPlacement(data: any) {
    return of(true);
  }
  updatePlacement(refNom: string, data: any) {
    return of(true);
  }

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


  getCedantList() {
    return of([
      { id: 1, value: 'ACME Insurance Co.', label: 'ACME Insurance Co.' },
      { id: 2, value: 'Secure Insurers', label: 'Secure Insurers' },
      { id: 3, value: 'Guardian General', label: 'Guardian General' },
      { id: 4, value: 'National Coverage', label: 'National Coverage' },
      { id: 5, value: 'Premier Insurance', label: 'Premier Insurance' },
      { id: 6, value: 'Global Risk Partners', label: 'Global Risk Partners' },
    ]);
  }

  getReinsurerList() {
    return of([
      { id: 1, value: 'Swiss Re', label: 'Swiss Re' },
      { id: 2, value: 'Munich Re', label: 'Munich Re' },
      { id: 3, value: 'Saudi Re', label: 'Saudi Re' },
      { id: 4, value: 'Hannover Re', label: 'Hannover Re' },
      { id: 5, value: "Lloyd's of London", label: "Lloyd's of London" },
      { id: 6, value: 'SCOR', label: 'SCOR' },
      { id: 7, value: 'Gen Re', label: 'Gen Re' },
      { id: 8, value: 'Partner Re', label: 'Partner Re' },
    ]);
  }

  getLifeReinsurerList() {
    return of([
      { id: 1, value: 'Gen Re Life/Health', label: 'Gen Re Life/Health' },
      { id: 2, value: 'Hannover Re Life', label: 'Hannover Re Life' },
      { id: 3, value: 'Munich Re Life', label: 'Munich Re Life' },
      { id: 4, value: 'Partner Re Life and Health', label: 'Partner Re Life and Health' },
      { id: 5, value: 'RGA Reinsurance', label: 'RGA Reinsurance' },
      { id: 6, value: 'SCOR Global Life', label: 'SCOR Global Life' },
      { id: 7, value: 'Saudi Re Life', label: 'Saudi Re Life' },
      { id: 8, value: 'Swiss Re Life & Health', label: 'Swiss Re Life & Health' },
    ]);
  }

  getLifeCedantList() {
    return of([
      { id: 1, value: 'Premier Life Assurance', label: 'Premier Life Assurance' },
      { id: 2, value: 'Guardian Life Insurance', label: 'Guardian Life Insurance' },
      { id: 3, value: 'National Life Company', label: 'National Life Company' },
      { id: 4, value: 'Secure Life Partners', label: 'Secure Life Partners' },
      { id: 5, value: 'Heritage Life Insurance', label: 'Heritage Life Insurance' },
    ]);
  }

  getLifeStatusList() {
    return of([
      { id: 1, value: 'In Progress', label: 'In Progress' },
      { id: 2, value: 'Open', label: 'Open' },
      { id: 3, value: 'Placed', label: 'Placed' },
      { id: 4, value: 'Posted', label: 'Posted' },
      { id: 5, value: 'Closed', label: 'Closed' },
    ]);
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
