import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';


@Injectable({
  providedIn: 'root'
})
export class ReinsuranceService {
  constructor(
    private apiService: ApiService,
    private helper: HelperService
  ) { }

  getSubmissionMetrics() {
    //return this.apiService.get<any[]>('');
    return of([
      {
        label: 'Total',
        value: 6,
        subtitle: '$1,495,000',
      },
      {
        label: 'Bound',
        value: 2,
        subtitle: '$750,000',
      },
      {
        label: 'Quoted',
        value: 2,
        subtitle: '$575,000',
      },
      {
        label: 'Pending',
        value: 2,
        subtitle: '$170,000',
      },
    ].map(item => ({
      ...item,
      ...this.helper.getSubmissionIcon(item.label)
    })));
  }

  getSubmissionHistory(payLoad: any) {
    //return this.apiService.post('',payLoad);
    return of(
      [
        {
          "refNo": "QS-2024-001",
          "account": "Global Corp",
          "cedant": "Secure Insurers",
          "lob": "Property",
          "inception": "01-Jan-2024",
          "siLol": "$10,000,000",
          "status": "Bound"
        },
        {
          "refNo": "PRX-2024-001",
          "account": "Mega Holdings",
          "cedant": "Alpha Assurance",
          "lob": "Casualty",
          "inception": "15-Feb-2024",
          "siLol": "$25,000,000",
          "status": "Quoted"
        },
        {
          "refNo": "SF-2024-001",
          "account": "Pioneer Logistics",
          "cedant": "Guardian General",
          "lob": "Marine",
          "inception": "01-Mar-2024",
          "siLol": "$5,000,000",
          "status": "Submitted"
        },
        {
          "refNo": "PPX-2024-001",
          "account": "Innovate Tech",
          "cedant": "Secure Insurers",
          "lob": "Technology",
          "inception": "10-Mar-2024",
          "siLol": "$50,000,000",
          "status": "Bound"
        },
        {
          "refNo": "SAF-2024-001",
          "account": "Coastal Properties",
          "cedant": "National Coverage",
          "lob": "Property",
          "inception": "20-Jan-2024",
          "siLol": "$15,000,000",
          "status": "Quoted"
        },
        {
          "refNo": "QS-2024-002",
          "account": "Tech Dynamics",
          "cedant": "Premier Insurance",
          "lob": "Technology",
          "inception": "05-Apr-2024",
          "siLol": "$8,000,000",
          "status": "Submitted"
        }
      ]
    );
  }

}