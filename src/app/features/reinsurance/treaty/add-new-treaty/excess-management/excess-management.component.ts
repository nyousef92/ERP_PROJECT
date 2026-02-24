import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreatyService } from '@core/services/treaty.service';

@Component({
    selector: 'app-excess-management',
    imports: [ReactiveFormsModule],
    templateUrl: './excess-management.component.html'
})
export class ExcessManagementComponent implements OnInit {
    treatyService = inject(TreatyService);
    fb = inject(FormBuilder);

    /** Companies list for the Company dropdown in each row */
    companies: any[] = [];

    /** Injected by the modal host — closes the modal */
    close!: () => void;

    /**
     * Pre-existing excess rows passed from the parent sub-detail row.
     * Set by the modal caller before the component initialises.
     */
    existingExcess: any[] = [];

    /**
     * Callback the parent provides. Called with the final excess rows
     * so the parent can write them back into its FormArray.
     */
    onSave!: (rows: any[]) => void;

    form!: FormGroup;

    ngOnInit(): void {
        this.form = this.fb.group({ rows: this.fb.array([]) });
        this.treatyService.getReInsurerenceSubDetailsCompanies().subscribe(resp => {
            this.companies = resp;
        });
        // Pre-populate rows from whatever the parent already has
        this.existingExcess.forEach(row => this.rows.push(this.createRow(row)));
    }

    get rows(): FormArray {
        return this.form.get('rows') as FormArray;
    }

    addRow(): void {
        this.rows.push(this.createRow());
    }

    removeRow(index: number): void {
        this.rows.removeAt(index);
    }

    saveExcess(): void {
        if (this.onSave) {
            this.onSave(this.rows.getRawValue());
        }
        this.close();
    }

    onCancel(): void {
        this.close();
    }

    private createRow(data?: any): FormGroup {
        return this.fb.group({
            company: [data?.company ?? '', Validators.required],
            signedPct: [data?.signedPct ?? ''],
            writtenPct: [data?.writtenPct ?? ''],
            brokerPct: [data?.brokerPct ?? ''],
            taxPct: [data?.taxPct ?? ''],
            commPct: [data?.commPct ?? ''],
            reason: [data?.reason ?? ''],
            description: [data?.description ?? '']
        });
    }
}
