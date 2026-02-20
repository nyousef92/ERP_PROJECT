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
    return of({
      totalItems: 10,
      data: [
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

    }
    );
  }

  getSubmissionItemDetails(refNumber: string) {
    return of({
      generalInfo: {
        status: 'draft',
        facType: 'Proportional',
        subType: 'Quota Share',
        originalInsured: 'Global Corp Ltd',
        reinsured: 'Alpha Re',
        address: '123 Finance Street, London, UK',
        periodFrom: '2024-01-01',
        periodTo: '2024-12-31',
        description: 'Property damage cover for industrial complex.',
        totalInsured: '10000000',
        limitOfLiability: '5000000',
        cover: 'All risks property damage including fire, flood and natural perils.',
        interest: 'Industrial property',
        topLocation: 'London, UK',
        originalConditions: 'Standard Lloyd\'s wording LMA3100.',
        choiceOfLaw: 'English law and jurisdiction.',
        riCondition: 'Back-to-back with original policy conditions.',
        warranties: 'Fire suppression systems maintained.',
        subjectivities: 'Survey report within 30 days.',
        deductibles: '$50,000 each and every loss.',
        exclusion: 'War, nuclear, cyber exclusions apply.',
        file: []
      },
      securityDetails: {
        reinsuranceLiabilityClause: 'Several liability only — each reinsurer liable for their own share.',
        orderHereon: '100%',
        basisOfWritten: 'Risk attaching',
        basisOfSignedLine: 'Pro rata',
        writtenLines: '25%',
        signingProvisions: 'Signing down applies if overplaced.'
      },
      fiscalRegulatory: {
        taxPayablebyUnderWritter: '2.5',
        taxPayableByInsured: '1.0',
        premiumRate: '0.75',
        commission: '15',
        fees: '2500'
      }
    });
  }

}