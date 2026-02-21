
import { Injectable } from '@angular/core';
import { HelperService } from '@core/services/helper.service';
import { map, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TreatyService {

    constructor(
        private helper: HelperService
    ) { }

    getSubmissionMetrics() {
        //return this.apiService.get<any[]>('');
        return of([
            {
                id: "treaty-total",
                label: "Total Treaties",
                value: 4,
                subtitle: "All-time recorded"
            },
            {
                id: "treaty-active",
                label: "Active",
                value: 0,
                subtitle: "Currently in effect"
            },
            {
                id: "treaty-pending",
                label: "Pending",
                value: 0,
                subtitle: "Awaiting signature"
            },
            {
                id: "treaty-monthly",
                label: "This Month",
                value: 2,
                subtitle: "Added since Oct 1"
            }
        ].map(item => ({
            ...item,
            ...this.helper.getSubmissionIcon(item.label)
        })));
    }

    getTreatyHistory(payLoad: any) {
        const treatyMockData = {
            totalItems: 10,
            data: [
                {
                    id: "QS-2024-123",
                    treatyCode: "QS-2024-123",
                    company: "Tawuniya",
                    type: "Proportional",
                    class: "Property",
                    currency: "SAR",
                    status: "Draft",
                },
                {
                    id: "RE-2024-456",
                    treatyCode: "RE-2024-456",
                    company: "Bupa Arabia",
                    type: "Non-Proportional",
                    class: "Casualty",
                    currency: "SAR",
                    status: "Pending Approval",
                },
                {
                    id: "SS-2024-789",
                    treatyCode: "SS-2024-789",
                    company: "Al Rajhi Takaful",
                    type: "Proportional",
                    class: "Marine",
                    currency: "USD",
                    status: "Approved",
                },
                {
                    id: "TRT-12348",
                    treatyCode: "TRT-12348",
                    company: "Malath Insurance",
                    type: "Proportional",
                    class: "Life",
                    currency: "SAR",
                    status: "Posted to Finance",
                }
            ]
        };
        return of(treatyMockData).pipe(
            map(data => {
                return {
                    ...data,
                    data: data.data.map((item: any) => {
                        return {
                            ...item,
                            statusIcon: this.getTrendIcon(item.status),
                            trendColorClass: this.getStatusClass(item.status)
                        }
                    })
                }
            })
        );
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'Pending Approval': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Posted to Finance': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    getTrendIcon(trendIcon: string): string {
        switch (trendIcon) {
            case 'Draft': return 'draft';
            case 'Pending Approval': return 'schedule';
            case 'Approved': return 'check_circle';
            case 'Posted to Finance': return 'check_circle';
            default: return 'archive-arrow-down';
        }
    }


    getTreatyDetails(refNumber: string) {
        const treatyDetail = {
            id: "QS-2024-123", // Using Treaty Code as the unique identifier
            treatyCode: "QS-2024-123",
            company: "Tawuniya",
            description: "Property Treaty 2024",
            type: "Proportional",
            class: "Property",
            currency: "SAR",
            fromDate: "2024-01-01",
            toDate: "2024-12-31",
            status: "Draft",
        };
        return of(treatyDetail).pipe(
            map(data => {
                return {
                    ...data,
                    statusIcon: this.getTrendIcon(data.status),
                    trendColorClass: this.getStatusClass(data.status)
                }
            })
        );
    }

    getCreateNewTreateData() {
        const formOptions = {

            companies: [
                { id: "COMP-88291", name: "Tawuniya", account: "ACC-00129388", fax: "+966 11 123 4567", phone: "+966 11 123 4567", email: "reinsurance@tawuniya.com.sa" },
                { id: "COMP-77342", name: "Bupa Arabia", account: "ACC-00994421", fax: "+966 12 667 0761", phone: "+966 12 667 0761", email: "re@bupa.com.sa" },
                { id: "COMP-66510", name: "Al Rajhi Takaful", account: "ACC-00441100", fax: "+966 11 228 1111", phone: "+966 11 228 1111", email: "info@alrajhitakaful.com" },
                { id: "COMP-55123", name: "Malath Insurance", account: "ACC-00223388", fax: "+966 11 216 1212", phone: "+966 11 216 1212", email: "treaty@malath.com.sa" }
            ],

            reInsureParticipantionsCompanies: [
                { id: "COMP-88291", name: "Tawuniya" },
                { id: "COMP-77342", name: "Bupa Arabia" }
            ],

            treatyTypes: [
                { value: "Proportional", label: "Proportional" },
                { value: "Non-Proportional", label: "Non-Proportional" }
            ],

            treatySubTypesMap: {
                Proportional: [
                    { value: 'Quota Share', label: 'Quota Share' },
                    { value: 'Surplus', label: 'Surplus' }
                ],
                'Non-Proportional': [
                    { value: 'Risk Excess', label: 'Risk Excess' },
                    { value: 'Catastrophe Excess', label: 'Catastrophe Excess' },
                    { value: 'Aggregate XoL', label: 'Aggregate XoL' },
                    { value: 'Clash Cover', label: 'Clash Cover' }
                ]
            },

            currencies: [
                { value: "SAR", label: "SAR - Saudi Riyal" },
                { value: "USD", label: "USD - US Dollar" },
                { value: "EUR", label: "EUR - Euro" },
                { value: "GBP", label: "GBP - British Pound" },
                { value: "AED", label: "AED - UAE Dirham" }
            ],

            lineOfBusiness: [
                { value: "Property", label: "Property" },
                { value: "Casualty", label: "Casualty" },
                { value: "Marine", label: "Marine" },
                { value: "Life", label: "Life" },
                { value: "Health", label: "Health" },
                { value: "Motor", label: "Motor" },
                { value: "Engineering", label: "Engineering" }
            ],

            subLOBs: {
                Property: [
                    { value: "Fire", label: "Fire" },
                    { value: "Burglary", label: "Burglary" },
                    { value: "Homeowners", label: "Homeowners" }
                ],
                Motor: [
                    { value: "Motor Third Party", label: "Motor Third Party" },
                    { value: "Motor Comprehensive", label: "Motor Comprehensive" }
                ],
                Marine: [
                    { value: "Marine Hull", label: "Marine Hull" },
                    { value: "Marine Cargo", label: "Marine Cargo" }
                ],
                Life: [
                    { value: "Group Life", label: "Group Life" },
                    { value: "Individual Life", label: "Individual Life" }
                ]
            }
        };
        return of(formOptions);
    }
}
