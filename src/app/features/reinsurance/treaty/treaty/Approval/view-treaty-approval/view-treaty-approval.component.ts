import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TreatyApprovalService } from "@core/services/traty-approval.service";
import { InputFieldComponent } from "@shared/input-field/input-field.component";

@Component({
    selector: 'app-view-treaty-approval',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputFieldComponent],
    templateUrl: './view-treaty-approval.component.html',
})
export class ViewTreatyApprovalComponent implements OnInit {
    treaty: any = null;

    form: FormGroup;

    /** Injected by the modal host — closes the modal */
    close!: () => void;
    
  onApproved!: () => void;
  onRejecteded!: () => void;

    /** Optional: treaty code passed by the opener */
    treatyCode?: string;

    constructor(private treatyApprovalService: TreatyApprovalService, private fb: FormBuilder) {
        this.form = this.fb.group({
            companyInfo: this.fb.group({
                company: [''],
                companyId: [''],
                accountNo: [''],
                phoneNo: [''],
                fax: [''],
                email: [''],
                address: [''],
            }),
            treatyDetails: this.fb.group({
                treatyCode: [''],
                description: [''],
                treatyType: [''],
                treatySubType: [''],
                currency: [''],
                fromDate: [''],
                toDate: [''],
                lob: [''],
                subLob: [''],
                comments: [''],
            }),
            submissionInfo: this.fb.group({
                submittedBy: [''],
                submittedDate: [''],
            }),
            remarks: [''],
        });
    }

    ngOnInit(): void {
        this.treatyApprovalService.treatyMockDataById.subscribe(data => {
            this.treaty = data;
            this.form.patchValue({
                companyInfo: {
                    company: data?.companyInformation?.company ?? '',
                    companyId: data?.companyInformation?.companyId ?? '',
                    accountNo: data?.companyInformation?.accountNo ?? '',
                    phoneNo: data?.companyInformation?.phoneNo ?? '',
                    fax: data?.companyInformation?.fax ?? '',
                    email: data?.companyInformation?.email ?? '',
                    address: data?.companyInformation?.address ?? '',
                },
                treatyDetails: {
                    treatyCode: data?.treatyDetails?.treatyCode ?? '',
                    description: data?.treatyDetails?.description ?? '',
                    treatyType: data?.treatyDetails?.treatyType ?? '',
                    treatySubType: data?.treatyDetails?.treatySubType ?? '',
                    currency: data?.treatyDetails?.currency ?? '',
                    fromDate: data?.treatyDetails?.fromDate ?? '',
                    toDate: data?.treatyDetails?.toDate ?? '',
                    lob: data?.treatyDetails?.lob ?? '',
                    subLob: data?.treatyDetails?.subLob ?? '',
                    comments: data?.treatyDetails?.comments ?? '',
                },
                submissionInfo: {
                    submittedBy: data?.submissionInformation?.submittedBy ?? '',
                    submittedDate: data?.submissionInformation?.submittedDate ?? '',
                },
                remarks: data?.approvalAction?.remarks ?? '',
            });
        });
    }

    onApprove(): void {
        console.log('Approve treaty:', this.treaty?.treatyDetails?.treatyCode, 'Remarks:', this.form.get('remarks')?.value);
        this.onApproved();
        this.close();
    }

    onReject(): void {
        console.log('Reject treaty:', this.treaty?.treatyDetails?.treatyCode, 'Remarks:', this.form.get('remarks')?.value);
        this.onRejecteded();
        this.close();
    }

    onClose(): void {
        this.close();
    }
}
