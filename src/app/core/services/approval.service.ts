import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { ApprovalFilter } from 'src/app/features/reinsurance/facultative/approval/approval.component';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  getApprovalDetails(id: any) {
    return of(
      {
        "placementDetails": {
          "referenceNumber": "FAC-2024-003",
          "insuredName": "Tech Innovations Inc",
          "classOfBusiness": "Professional Indemnity",
          "sumInsured": "$2,000,000",
          "totalPremium": "$35,000",
          "broker": "Aon",
          "effectiveDate": "2024-01-20",
          "expiryDate": "2025-01-20"
        },
        "reinsurers": [
          {
            "name": "Berkshire Hathaway Re",
            "share": "60%",
            "premium": "$21,000"
          },
          {
            "name": "Partner Re",
            "share": "40%",
            "premium": "$14,000"
          }
        ]
      }
    );
  }

  getApprovalsHistory(arg0: { status: number; }) {
    return of([
      {
        "refNom": "FAC-2024-001",
        "insured": "ABC Manufacturing Ltd",
        "class": "Property",
        "premium": "$75,000",
        "status": "rejected"
      },
      {
        "refNom": "FAC-2024-002",
        "insured": "XYZ Logistics Corp",
        "class": "Marine Cargo",
        "premium": "$45,000",
        "status": "Pending"
      },
      {
        "refNom": "FAC-2024-003",
        "insured": "Tech Innovations Inc",
        "class": "Professional Indemnity",
        "premium": "$35,000",
        "status": "Approved"
      }
    ]).pipe(
      map(history => {
        return history.map(item => {
          let status: ApprovalFilter;
          switch (item.status.toLocaleLowerCase()) {
            case 'approved':
              status = ApprovalFilter.Approved;
              break;
            case 'pending':
              status = ApprovalFilter.Pending;
              break;
            default:
              status = ApprovalFilter.Rejected;
          }
          return { ...item, status };
        });
      })
    );
  }

  getStatuses() {
    return of([
      { key: 'all', label: 'All', id: 0 },
      { key: 'pending', label: 'Pending', id: 1 },
      { key: 'approved', label: 'Approved', id: 2 },
      { key: 'rejected', label: 'Rejected', id: 3 },
    ]);
  }

}
