import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClaimsService {
  updateReinsurer(value: any) {
    return of(true);
  }


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
      { claimNo: 'CLM-2024-001', facRef: 'FR-2024-001', cedant: 'Secure Insurers', claimAmount: 500000, approvedAmount: 500000, dateReported: '15-Mar-2024', status: 'Approved' },
      { claimNo: 'CLM-2024-002', facRef: 'FR-2024-002', cedant: 'Alpha Assurance', claimAmount: 1200000, approvedAmount: 950000, dateReported: '20-Mar-2024', status: 'Partially Approved' },
      { claimNo: 'CLM-2024-003', facRef: 'FR-2024-003', cedant: 'Guardian General', claimAmount: 300000, approvedAmount: 0, dateReported: '25-Mar-2024', status: 'Pending' },
      { claimNo: 'CLM-2024-004', facRef: 'FR-2024-004', cedant: 'Secure Insurers', claimAmount: 750000, approvedAmount: 0, dateReported: '01-Apr-2024', status: 'Rejected' },
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

  reject(id: string) {
    return of(true);
  }
  approve(id: string) {
    return of(true);
  }
  getClaimDetails(claimNo: string) {
    const details: Record<string, any> = {
      'CLM-2024-001': {
        claimNo: 'CLM-2024-001', facRef: 'FR-2024-001', account: 'Global Corp',
        cedant: 'Secure Insurers', lob: 'Property', claimType: 'Property Damage',
        claimDate: '2024-04-15', lossDate: '2024-04-10', claimAmount: 750000,
        status: 'Pending Approval',
        description: 'Major fire damage to warehouse facility',
        attachments: ['claim_report.pdf', 'photos.zip', 'assessment_report.pdf'],
        approvalHistory: [
          { action: 'Created', date: '2024-04-15 14:30', role: 'Claims Officer', notes: 'Initial claim submission' },
          { action: 'Submitted for Approval', date: '2024-04-16 09:15', role: 'Claims Manager', notes: 'All documentation verified' },
        ],
        reinsurerLines: [
          { name: 'Munich Re', share: '40%', claimAmount: 300000, status: 'Approved', approvedAmount: 300000, notes: 'Claim approved in full', history: [
            { status: 'Pending', date: '2024-04-15 10:30', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: ['claim_report.pdf'] },
            { status: 'Approved', date: '2024-04-18 14:20', user: 'Admin User', notes: 'Claim approved in full', attachments: ['approval_letter.pdf'] },
          ]},
          { name: 'Swiss Re', share: '35%', claimAmount: 262500, status: 'Partially Approved', approvedAmount: 200000, notes: 'Approved with deductible applied', history: [
            { status: 'Pending', date: '2024-04-15 10:30', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: ['claim_report.pdf'] },
            { status: 'Partially Approved', date: '2024-04-19 09:00', user: 'Admin User', notes: 'Approved with deductible applied', attachments: ['partial_approval.pdf'] },
          ]},
          { name: 'Hannover Re', share: '25%', claimAmount: 187500, status: 'Pending', approvedAmount: 0, notes: '-', history: [
            { status: 'Pending', date: '2024-04-15 10:30', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: [] },
          ]},
        ],
        totalClaimed: 750000, totalApproved: 500000
      },
      'CLM-2024-002': {
        claimNo: 'CLM-2024-002', facRef: 'FR-2024-002', account: 'Marine Holdings',
        cedant: 'Alpha Assurance', lob: 'Marine', claimType: 'Cargo Loss',
        claimDate: '2024-03-22', lossDate: '2024-03-18', claimAmount: 1200000,
        status: 'Partially Approved',
        description: 'Cargo loss during maritime transit partially covered under facultative agreement.',
        attachments: ['cargo_manifest.pdf', 'survey_report.pdf'],
        approvalHistory: [
          { action: 'Created', date: '2024-03-22 10:00', role: 'Claims Officer', notes: 'Cargo loss reported by cedant' },
          { action: 'Under Review', date: '2024-03-23 11:30', role: 'Senior Adjuster', notes: 'Survey report requested' },
          { action: 'Partially Approved', date: '2024-03-28 14:00', role: 'Claims Manager', notes: 'Approved subject to policy sub-limit' },
        ],
        reinsurerLines: [
          { name: 'Lloyd\'s Syndicate', share: '50%', claimAmount: 600000, status: 'Approved', approvedAmount: 475000, notes: 'Approved with sub-limit deduction', history: [
            { status: 'Pending', date: '2024-03-22 11:00', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: ['cargo_manifest.pdf'] },
            { status: 'Approved', date: '2024-03-28 14:00', user: 'Admin User', notes: 'Approved with sub-limit deduction', attachments: ['approval_notice.pdf'] },
          ]},
          { name: 'AXA Re', share: '30%', claimAmount: 360000, status: 'Partially Approved', approvedAmount: 285000, notes: 'Pending final survey confirmation', history: [
            { status: 'Pending', date: '2024-03-22 11:00', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: [] },
            { status: 'Partially Approved', date: '2024-03-29 10:00', user: 'Admin User', notes: 'Partial approval pending survey', attachments: ['partial_approval.pdf'] },
          ]},
          { name: 'General Re', share: '20%', claimAmount: 240000, status: 'Pending', approvedAmount: 0, notes: 'Awaiting documentation', history: [
            { status: 'Pending', date: '2024-03-22 11:00', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: [] },
          ]},
        ],
        totalClaimed: 1200000, totalApproved: 760000
      },
      'CLM-2024-003': {
        claimNo: 'CLM-2024-003', facRef: 'FR-2024-003', account: 'Guardian Holdings',
        cedant: 'Guardian General', lob: 'Liability', claimType: 'Third-Party Liability',
        claimDate: '2024-03-26', lossDate: '2024-03-20', claimAmount: 300000,
        status: 'Pending',
        description: 'Third-party liability claim under review pending loss assessment.',
        attachments: ['incident_report.pdf'],
        approvalHistory: [
          { action: 'Created', date: '2024-03-26 09:00', role: 'Claims Officer', notes: 'Liability claim received from cedant' },
          { action: 'Pending Assessment', date: '2024-03-27 11:00', role: 'Loss Adjuster', notes: 'Awaiting independent loss assessment' },
        ],
        reinsurerLines: [
          { name: 'Munich Re', share: '60%', claimAmount: 180000, status: 'Pending', approvedAmount: 0, notes: 'Awaiting assessment results', history: [
            { status: 'Pending', date: '2024-03-26 09:30', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: ['incident_report.pdf'] },
          ]},
          { name: 'Swiss Re', share: '40%', claimAmount: 120000, status: 'Pending', approvedAmount: 0, notes: 'Awaiting assessment results', history: [
            { status: 'Pending', date: '2024-03-26 09:30', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: [] },
          ]},
        ],
        totalClaimed: 300000, totalApproved: 0
      },
      'CLM-2024-004': {
        claimNo: 'CLM-2024-004', facRef: 'FR-2024-004', account: 'Secure Holdings',
        cedant: 'Secure Insurers', lob: 'Property', claimType: 'Structural Damage',
        claimDate: '2024-04-02', lossDate: '2024-03-28', claimAmount: 750000,
        status: 'Rejected',
        description: 'Property damage claim rejected due to policy exclusions.',
        attachments: ['rejection_letter.pdf', 'policy_exclusions.pdf'],
        approvalHistory: [
          { action: 'Created', date: '2024-04-02 08:30', role: 'Claims Officer', notes: 'Claim submitted for structural damage' },
          { action: 'Under Review', date: '2024-04-03 10:00', role: 'Senior Adjuster', notes: 'Policy terms being reviewed' },
          { action: 'Rejected', date: '2024-04-05 15:00', role: 'Claims Manager', notes: 'Damage falls under policy exclusion clause 4.2' },
        ],
        reinsurerLines: [
          { name: 'Hannover Re', share: '55%', claimAmount: 412500, status: 'Rejected', approvedAmount: 0, notes: 'Policy exclusion applied', history: [
            { status: 'Pending', date: '2024-04-02 09:00', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: ['claim_form.pdf'] },
            { status: 'Rejected', date: '2024-04-05 15:00', user: 'Admin User', notes: 'Rejected — policy exclusion clause 4.2', attachments: ['rejection_letter.pdf'] },
          ]},
          { name: 'AXA Re', share: '45%', claimAmount: 337500, status: 'Rejected', approvedAmount: 0, notes: 'Policy exclusion applied', history: [
            { status: 'Pending', date: '2024-04-02 09:00', user: 'Admin User', notes: 'Claim submitted to reinsurer', attachments: [] },
            { status: 'Rejected', date: '2024-04-05 15:30', user: 'Admin User', notes: 'Rejected — policy exclusion clause 4.2', attachments: ['rejection_letter.pdf'] },
          ]},
        ],
        totalClaimed: 750000, totalApproved: 0
      },
    };
    return of(details[claimNo] ?? null);
  }
}
