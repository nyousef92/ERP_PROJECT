import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TreatyApprovalService } from "@core/services/traty-approval.service";

@Component({
    selector: 'app-view-treaty-approval',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './view-treaty-approval.component.html',
})
export class ViewTreatyApprovalComponent implements OnInit {
    treaty: any = null;

    /** Remarks bound to the textarea */
    remarks = '';

    /** Injected by the modal host — closes the modal */
    close!: () => void;

    /** Optional: treaty code passed by the opener */
    treatyCode?: string;

    constructor(private treatyApprovalService: TreatyApprovalService) { }

    ngOnInit(): void {
        this.treatyApprovalService.treatyMockDataById.subscribe(data => {
            this.treaty = data;
            this.remarks = data?.approvalAction?.remarks ?? '';
        });
    }

    onApprove(): void {
        console.log('Approve treaty:', this.treaty?.treatyDetails?.treatyCode, 'Remarks:', this.remarks);
        this.close();
    }

    onReject(): void {
        console.log('Reject treaty:', this.treaty?.treatyDetails?.treatyCode, 'Remarks:', this.remarks);
        this.close();
    }

    onClose(): void {
        this.close();
    }
}
