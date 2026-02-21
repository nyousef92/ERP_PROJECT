import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';

const submissionClasses: Record<string, { trendIcon: string, trendColorClass: string, cardClass: string, labelClass: string, valueClass: string }> = {
  ['Total']: {
    trendIcon: 'trending_up',
    trendColorClass: 'text-blue-600',
    cardClass: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    labelClass: 'text-blue-700',
    valueClass: 'text-blue-900',
  },
  ['Bound']: {
    trendIcon: 'check_circle',
    trendColorClass: 'text-green-600',
    cardClass: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    labelClass: 'text-green-700',
    valueClass: 'text-green-900',
  },
  ['Quoted']: {
    trendIcon: 'error_outline',
    trendColorClass: 'text-sky-600',
    cardClass: 'bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200',
    labelClass: 'text-sky-700',
    valueClass: 'text-sky-900',
  },
  ['Pending']: {
    trendIcon: 'schedule',
    trendColorClass: 'text-yellow-600',
    cardClass: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
    labelClass: 'text-yellow-700',
    valueClass: 'text-yellow-900',
  }
};

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  constructor(
    private apiService: ApiService,
  ) { }


  getCedantList() {
    return of([
      { id: 1, value: 'Global Insurance Co.', label: 'Global Insurance Co.' },
      { id: 2, value: 'Alliance Assurance', label: 'Alliance Assurance' },
      { id: 3, value: 'National Coverage', label: 'National Coverage' },
      { id: 4, value: 'Alpha Assurance', label: 'Alpha Assurance' },
      { id: 5, value: 'Premier Insurance', label: 'Premier Insurance' },
      { id: 6, value: 'Secure Insurers', label: 'Secure Insurers' },
      { id: 7, value: 'Guardian General', label: 'Guardian General' },
    ]);
  }

  getLineOfBusinessTypes(): Observable<any[]> {
    return of([
      {
        type: 'Property',
        id:1,
        
        subTypes: ['Fire', 'Flood', 'Earthquake', 'Earthquake', 'Business Interuption', 'All Risks']
      },
      {
        type: 'Casualty',
        id:2,
        subTypes: ["General Liability", "Professional Liability", "Product Liability", "Employers Liability", "Public Liability"]
      },
      {
        type: 'Marine',
        id:3, 
        subTypes: ["Cargo", "Hull", "Marine Liability", "Yacht", "Port Risk"]
      },
      {
        type: 'Aviation',
        id:4,
        subTypes: ["Hull War", "Aviation Liability", "Passenger Liability", "Airport Liability"]
      },
      {
        type: 'Enineering',
        id:5,
        subTypes: ["Construction", "Machinery Breakdown", "Erection All Risks", "Contractors All Risks", "Electronic Equipment"]
      }
      ,
      {
        type: 'energy',
        id:6,
        subTypes: ["Offshore Energy", "Onshore Energy", "Renewable Energy", "Upstream", "Downstream"]
      }
      ,
      {
        type: 'Motor',
        id:7,
        subTypes: ["Private Car", "Commercial Vehicle", "Third Party Liability", "Comprehensive", "Fleet"]
      }
      ,
      {
        type: 'Medical',
        id:8, 
        subTypes: ["Health Insurance", "Medical Malpractice", "Hospital Liability", "Group Medical"]
      }
      ,
      {
        type: 'Life',
        id:9,
        subTypes: ["Term Life", "Whole Life", "Endowment", "Group Life", "Credit Life"]
      }
      ,
      {
        type: 'Technology',
        id:10,
        subTypes: ["Cyber Liability", "Technology E&O", "Data Breach", "Network Security", "Media Liability"]
      }
    ])
  }

  getSubmissionTypes(): Observable<any[]> {
    //return this.apiService.get('')
    return of(
      [
        {
          facType: "Properotional",
          subType: [
            "Quota Share",
            "Surplus Fac"
          ]
        },
        {
          facType: "Non-Properotional",
          subType: [
            "Per Risk XoL",
            "Per Policy XoL"
          ]
        },
        {
          facType: "Facilities",
          subType: [
            "Semi-Automatic Fac",
            "Per Policy XoL"
          ]
        },
      ]);
  }

  saveFacultativeSubmission(arg0: { generalInfo: any; securityDetails: any; fiscalRegulatory: any; }) {
    //return this.apiService.post('',arg0)
    return of(true);
  }

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
      ...submissionClasses[item.label]
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

  getSecuritiesList() {
    return of([
      { id: 1, value: 1, label: "Swiss Re" },
      { id: 2, value: 2, label: "Munich Re" },
      { id: 3, value: 3, label: "Saudi Re" },
      { id: 4, value: 4, label: "Hannover Re" },
      { id: 5, value: 5, label: "Lloyd's of London" },
      { id: 6, value: 6, label: "SCOR" },
      { id: 7, value: 7, label: "Gen Re" },
      { id: 8, value: 8, label: "Partner Re" },
      { id: 9, value: 9, label: "Berkshire Hathaway Re" },
      { id: 10, value: 10, label: "RGA (Reinsurance Group of America)" },
      { id: 11, value: 11, label: "Everest Re" },
      { id: 12, value: 12, label: "TransRe" },
      { id: 13, value: 13, label: "PartnerRe" },
      { id: 14, value: 14, label: "XL Catlin" },
      { id: 15, value: 15, label: "Axis Re" },
      { id: 16, value: 16, label: "Validus Re" },
      { id: 17, value: 17, label: "Tokio Marine" },
      { id: 18, value: 18, label: "MS&AD" },
      { id: 19, value: 19, label: "China Re" },
      { id: 20, value: 20, label: "Korean Re" },
      { id: 21, value: 21, label: "African Re" },
      { id: 22, value: 22, label: "GIC Re (General Insurance Corporation)" },
      { id: 23, value: 23, label: "LIC Re (Life Insurance Corporation Re)" },
      { id: 24, value: 24, label: "Trust Re" },
      { id: 25, value: 25, label: "Aspen Re" },
      { id: 26, value: 26, label: "Renaissance Re" },
      { id: 27, value: 27, label: "QBE Re" },
      { id: 28, value: 28, label: "Sompo International" },
      { id: 29, value: 29, label: "AXA XL" },
      { id: 30, value: 30, label: "Chubb Re" },
    ]);
  }

  getProgressSheetPreview(refNumber: string) {
    return of({
      refNumber: refNumber,
      submission: {
        insuredName: 'Global Manufacturing Inc.',
        cedingCompany: 'ACME Insurance Co.',
        reinsuranceType: 'Facultative - Excess of Loss',
        underlyingPolicy: 'Commercial Property - POL-456789',
        effectiveDate: '01 Jan 2024',
        expiryDate: '31 Dec 2024',
        id: 'QS-2024-001'
      },
      financials: {
        policyLimit: 25000000,
        attachmentPoint: 5000000,
        grossWrittenPremium: 500000,
        cededPremium: 125000,
        commissionRate: '12.5%',
        participationShare: '25%',
      },
      documents: [
        { name: 'Underwriting_Submission.pdf', type: 'Submission File', uploadDate: '15 Dec 2023' },
        { name: 'Policy_Slip_Draft_v2.docx', type: 'Policy Slip', uploadDate: '28 Dec 2023' },
        { name: 'Final_Quotation_Signed.pdf', type: 'Quotation', uploadDate: '05 Jan 2024' },
        { name: 'Risk_Survey_Report.pdf', type: 'Survey', uploadDate: '10 Jan 2024' },
        { name: 'Binding_Authority_Confirmation.pdf', type: 'Confirmation', uploadDate: '12 Jan 2024' },
      ],
      progress: "Bound",
      securities: [
        "Swiss Re",
        "Munich Re",
        "Saudi Re",
        "Hannover Re"
      ],
      summary: "All detailed information, including financials, documents, and notes, are available in the full progress sheet. Click below to view or edit the complete details of this facultative placement."
    });
  }

}
