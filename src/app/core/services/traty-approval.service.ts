import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TreatyApprovalService {
    constructor() { }

    get treatyMockData() {
        return of([
            {
                treatyCode: "QS-2024-456",
                company: "Tawuniya",
                description: "Motor Quota Share Treaty 2024",
                treatyType: "Proportional",
                subType: "Quota Share",
                fromDate: "2024-01-01",
                toDate: "2024-12-31",
                currency: "SAR",
                class: "Motor",
                submittedBy: "Ahmed Al-Mansour",
                submittedDate: "2024-12-15",
                status: "Pending Approval",
                actions: ["view", "approve", "reject"]
            },
            {
                treatyCode: "RE-2024-789",
                company: "Bupa Arabia",
                description: "Medical Excess of Loss Treaty 2024",
                treatyType: "Non-Proportional",
                subType: "Risk Excess",
                fromDate: "2024-01-01",
                toDate: "2024-12-31",
                currency: "SAR",
                class: "Medical",
                submittedBy: "Sara Al-Khalifa",
                submittedDate: "2024-12-16",
                status: "Pending Approval",
                actions: ["view", "approve", "reject"]
            },
            {
                treatyCode: "SS-2024-321",
                company: "Al Rajhi Takaful",
                description: "Property Surplus Share Treaty 2024",
                treatyType: "Proportional",
                subType: "Surplus Share",
                fromDate: "2024-01-01",
                toDate: "2024-12-31",
                currency: "USD",
                class: "Property",
                submittedBy: "Mohammed Al-Otaibi",
                submittedDate: "2024-12-10",
                status: "Approved",
                actions: ["view"]
            }
        ]);
    }


    get treatyMockDataById() {
        return of({
            companyInformation: {
                company: "Tawuniya",
                companyId: "COM-001",
                accountNo: "ACC-1001",
                phoneNo: "+966 11 234 5678",
                fax: "+966 11 234 5679",
                email: "info@tawuniya.com.sa",
                address: "King Fahd Road, Riyadh, Saudi Arabia"
            },

            treatyDetails: {
                treatyCode: "QS-2024-456",
                description: "Motor Quota Share Treaty 2024",
                treatyType: "Proportional",
                treatySubType: "Quota Share",
                currency: "SAR",
                fromDate: "2024-01-01",
                toDate: "2024-12-31",
                comments: "Annual motor treaty renewal",
                lob: "Motor",
                subLob: "Private Car",
                catastropheCoverage: false
            },

            reinsurerParticipation: [
                {
                    company: "Swiss Re",
                    capacity: 50000000,
                    qsPercent: 40,
                    retentionPercent: 60,
                    signedPercent: 30,
                    writtenPercent: 28,
                    brokerPercent: 5,
                    taxPercent: 2,
                    commissionPercent: 15,
                    reason: "Primary capacity",
                    description: "Lead reinsurer"
                }
            ],

            submissionInformation: {
                submittedBy: "Ahmed Al-Mansour",
                submittedDate: "2024-12-15"
            },

            approvalAction: {
                remarks: ""
            }
        });
    }
}
