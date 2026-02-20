import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProgressSheetService {
  

  deleteProgressSheet(refNo: string) {
    return of(true);
  }

  getProgressSheetHistory(payload: { search: string; currentPage: number; pageSize: number; }) {
    return of(
      {
        totalItems: 10,
        data: [
          {
            "refNo": "QS-2024-001",
            "share": "Global Corp",
            "cedant": "Secure Insurers",
            "lob": "Property",
            "inception": "01-Jan-2024",
            "siLol": "$10,000,000",
            "status": "Bound"
          },
          {
            "refNo": "PRX-2024-001",
            "share": "Mega Holdings",
            "cedant": "Alpha Assurance",
            "lob": "Casualty",
            "inception": "15-Feb-2024",
            "siLol": "$25,000,000",
            "status": "Quoted"
          },
          {
            "refNo": "SF-2024-001",
            "share": "Pioneer Logistics",
            "cedant": "Guardian General",
            "lob": "Marine",
            "inception": "01-Mar-2024",
            "siLol": "$5,000,000",
            "status": "Submitted"
          },
          {
            "refNo": "PPX-2024-001",
            "share": "Innovate Tech",
            "cedant": "Secure Insurers",
            "lob": "Technology",
            "inception": "10-Mar-2024",
            "siLol": "$50,000,000",
            "status": "Bound"
          },
          {
            "refNo": "SAF-2024-001",
            "share": "Coastal Properties",
            "cedant": "National Coverage",
            "lob": "Property",
            "inception": "20-Jan-2024",
            "siLol": "$15,000,000",
            "status": "Quoted"
          },
          {
            "refNo": "QS-2024-002",
            "share": "Tech Dynamics",
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


  getProgressSheetDetailsView(refNumber: string) {
    return of({
      account: 'Acc-001',
      cedant: 'Global Insurance Co.',
      lob: 'Property',
      inceptionDate: '01/01/2023',
      siLol: '$10,000,000',
      rate: '5.25%',
      commission: '15.00%',
      receiptDate: '01/15/2023',
      notes: 'Standard property coverage. Terms and conditions as per original slip. Subject to final survey report.',
      reinsurers: [
        { name: { id: 1, name: 'Swiss Re' }, share: 25.00, rate: 5.25, commission: 10.00, tax: 5.00, comments: 'Standard terms applied.' },
        { name: { id: 2, name: 'Munich Re' }, share: 30.00, rate: 5.25, commission: 10.00, tax: 5.00, comments: 'Agreed, awaiting signed slip.' },
        { name: { id: 3, name: 'Saudi Re' }, share: 15.00, rate: 5.30, commission: 11.50, tax: 0, comments: 'Subject to engineering survey.' },
      ]
    });
  }
  
  getProgressSheetMetrics() {
    return of([
      {
        label: 'Total Sheets',
        value: '1',
        subtitle: null,
        iconType: null,
        ValueColorClass: 'text-text'
      },
      {
        label: 'Bound',
        value: '2',
        subtitle: null,
        iconType: null,
        ValueColorClass: 'text-success'
      }
      , {
        label: 'Quoted',
        value: '1',
        subtitle: null,
        iconType: null,
        ValueColorClass: 'text-primary'
      }
      , {
        label: 'Pending',
        value: '5',
        subtitle: null,
        iconType: null,
        ValueColorClass: 'text-warning'
      }
    ])
  }

  updateProgressSheet(id: any, progressSheet: any) {
    return of(true);
  }

  addNewProgressSheet(progressSheet: any) {
    return of(true);
  }


  getLOBList() {
    return of([
      { id: 1, value: 'Property', label: 'Property' },
      { id: 2, value: 'Casualty', label: 'Casualty' },
      { id: 3, value: 'Marine', label: 'Marine' },
      { id: 4, value: 'Energy', label: 'Energy' },
      { id: 5, value: 'Aviation', label: 'Aviation' },
      { id: 6, value: 'Liability', label: 'Liability' },
    ]);
  }

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


}
