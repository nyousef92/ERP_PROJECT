import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClaimsService {


  getClaimsMetrics() {
    return of([
      { label: 'Total Claims', value: 4, subtitle: '$2,750,000' },
      { label: 'Approved', value: 1, subtitle: '$1,450,000', ValueColorClass: 'text-success' },
      { label: 'Pending', value: 1, ValueColorClass: 'text-warning' },
      { label: 'Rejected', value: 1, ValueColorClass: 'text-danger' },
    ]);
  }

  getClaimsHistory(params: any) {
    let filtered = [
      { claimNo: 'CLM-2024-001', facRef: 'FR-2024-001', cedant: 'Secure Insurers', claimAmount: '$500,000', approvedAmount: '$500,000', dateReported: '15-Mar-2024', status: 'Approved' },
      { claimNo: 'CLM-2024-002', facRef: 'FR-2024-002', cedant: 'Alpha Assurance', claimAmount: '$1,200,000', approvedAmount: '$950,000', dateReported: '20-Mar-2024', status: 'Partially Approved' },
      { claimNo: 'CLM-2024-003', facRef: 'FR-2024-003', cedant: 'Guardian General', claimAmount: '$300,000', approvedAmount: '$0', dateReported: '25-Mar-2024', status: 'Pending' },
      { claimNo: 'CLM-2024-004', facRef: 'FR-2024-004', cedant: 'Secure Insurers', claimAmount: '$750,000', approvedAmount: '$0', dateReported: '01-Apr-2024', status: 'Rejected' },
    ];
    if (params.searchText)
      filtered = filtered.filter(i =>
        i.claimNo.toLowerCase().includes(params.searchText.toLowerCase()) ||
        i.cedant.toLowerCase().includes(params.searchText.toLowerCase())
      );
    if (params.status) filtered = filtered.filter(i => i.status === params.status);
    if (params.cedant) filtered = filtered.filter(i => i.cedant === params.cedant);
    const start = (params.currentPage - 1) * params.pageSize;
    return of({ data: filtered.slice(start, start + params.pageSize), totalItems: filtered.length });
  }

  getClaimsStatuses() {
    return of([
      { label: 'Approved', value: 'Approved' },
      { label: 'Partially Approved', value: 'Partially Approved' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Rejected', value: 'Rejected' },
    ]);
  }

  getClaimsCedants() {
    return of([
      { label: 'Secure Insurers', value: 'Secure Insurers' },
      { label: 'Alpha Assurance', value: 'Alpha Assurance' },
      { label: 'Guardian General', value: 'Guardian General' },
    ]);
  }

  getClaimDetails(claimNo: string) {
    const details: Record<string, any> = {
      'CLM-2024-001': {
        claimNo: 'CLM-2024-001', facRef: 'FR-2024-001', cedant: 'Secure Insurers',
        claimAmount: '$500,000', approvedAmount: '$500,000', dateReported: '15-Mar-2024',
        status: 'Approved', lossType: 'Fire', incidentDate: '10-Mar-2024',
        description: 'Fire damage to commercial property covered under facultative reinsurance agreement.',
        reinsurers: [
          { name: 'Munich Re', share: '40%', amount: '$200,000', status: 'Paid' },
          { name: 'Swiss Re', share: '35%', amount: '$175,000', status: 'Paid' },
          { name: 'Hannover Re', share: '25%', amount: '$125,000', status: 'Paid' },
        ]
      },
      'CLM-2024-002': {
        claimNo: 'CLM-2024-002', facRef: 'FR-2024-002', cedant: 'Alpha Assurance',
        claimAmount: '$1,200,000', approvedAmount: '$950,000', dateReported: '20-Mar-2024',
        status: 'Partially Approved', lossType: 'Marine', incidentDate: '12-Mar-2024',
        description: 'Cargo loss during maritime transit partially covered under facultative agreement.',
        reinsurers: [
          { name: 'Lloyd\'s Syndicate', share: '50%', amount: '$475,000', status: 'Paid' },
          { name: 'AXA Re', share: '30%', amount: '$285,000', status: 'Pending' },
          { name: 'General Re', share: '20%', amount: '$190,000', status: 'Pending' },
        ]
      },
      'CLM-2024-003': {
        claimNo: 'CLM-2024-003', facRef: 'FR-2024-003', cedant: 'Guardian General',
        claimAmount: '$300,000', approvedAmount: '$0', dateReported: '25-Mar-2024',
        status: 'Pending', lossType: 'Liability', incidentDate: '20-Mar-2024',
        description: 'Third-party liability claim under review pending loss assessment.',
        reinsurers: [
          { name: 'Munich Re', share: '60%', amount: '$0', status: 'Pending' },
          { name: 'Swiss Re', share: '40%', amount: '$0', status: 'Pending' },
        ]
      },
      'CLM-2024-004': {
        claimNo: 'CLM-2024-004', facRef: 'FR-2024-004', cedant: 'Secure Insurers',
        claimAmount: '$750,000', approvedAmount: '$0', dateReported: '01-Apr-2024',
        status: 'Rejected', lossType: 'Property', incidentDate: '28-Mar-2024',
        description: 'Property damage claim rejected due to policy exclusions.',
        reinsurers: [
          { name: 'Hannover Re', share: '55%', amount: '$0', status: 'Rejected' },
          { name: 'AXA Re', share: '45%', amount: '$0', status: 'Rejected' },
        ]
      },
    };
    return of(details[claimNo] ?? null);
  }
}
