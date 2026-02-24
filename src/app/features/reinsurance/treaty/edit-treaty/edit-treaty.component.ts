import { Component, inject, OnInit } from '@angular/core';
import { TreatyService } from '../../../../core/services/treaty.service';
import { FacultativeSubmissionService } from '../../../../core/services/facultative.submission.service';
import { SharedService } from '@core/services/shared.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { SelectDropdownComponent, SelectOption } from '@shared/select-dropdown/select-dropdown.component';

@Component({
    selector: 'app-edit-treaty',
    imports: [ReactiveFormsModule, InputFieldComponent, SelectDropdownComponent],
    templateUrl: './edit-treaty.component.html'
})
export class EditTreatyComponent implements OnInit {
    treatyService = inject(TreatyService);
    facultativeSubmissionService = inject(FacultativeSubmissionService);
    shared = inject(SharedService);
    fb = inject(FormBuilder);

    treatyForm!: FormGroup;
    isLoading = true;

    companies: any[] = [];
    rInsurerenceCompanies: any[] = [];
    treatyTypes: SelectOption[] = [];
    subTypesMap: Record<string, SelectOption[]> = {};
    currencies: SelectOption[] = [];
    lobOptions: SelectOption[] = [];
    subLobMap: Record<string, SelectOption[]> = {};

    get companyOptions(): SelectOption[] {
        return this.companies.map(c => ({ value: String(c.id), label: c.name }));
    }

    get rInsurerOptions(): SelectOption[] {
        return this.rInsurerenceCompanies.map((c: any) => ({ value: c.value, label: c.value }));
    }

    /** Injected by the modal host — the id of the treaty to edit */
    treatyId!: string;
    close!: () => void;

    ngOnInit(): void {
        this.initForm();
        this.loadLists();
        this.loadTreatyForEdit();
    }

    private loadLists(): void {
        this.treatyService.getTreatyCompanies().subscribe(resp => {
            this.companies = resp;
        });

        this.treatyService.getReInsurerenceCompanies().subscribe(resp => {
            this.rInsurerenceCompanies = resp;
        });

        this.treatyService.getTreatryYypes().subscribe(resp => {
            this.treatyTypes = resp.map((c: any) => ({ value: c.value, label: c.name }));
        });

        this.treatyService.getTreatySubTypesMap().subscribe(resp => {
            this.subTypesMap = resp;
        });

        this.shared.getCurrencies().subscribe(resp => {
            this.currencies = resp;
        });

        this.facultativeSubmissionService.getLineOfBusinessTypes().subscribe(resp => {
            this.lobOptions = resp.map((item: any) => ({ value: item.type, label: item.type }));
            this.subLobMap = resp.reduce((acc: Record<string, SelectOption[]>, item: any) => {
                acc[item.type] = (item.subTypes as string[]).map(s => ({ value: s, label: s }));
                return acc;
            }, {});
        });
    }

    onCancel(): void {
        this.close();
    }

    selectCompany(companyId: string): void {
        const company = this.companies.find((c: any) => String(c.id) === companyId);
        if (company) {
            this.treatyForm.get('companyInfo')?.patchValue({
                selectedCompany: String(company.id),
                companyId: company.id,
                accountNo: company.account,
                phoneNo: company.phone,
                fax: company.fax,
                email: company.email,
                address: company.address ?? ''
            });
        } else {
            this.treatyForm.get('companyInfo')?.patchValue({
                selectedCompany: '',
                companyId: '', accountNo: '', phoneNo: '', fax: '', email: '', address: ''
            });
        }
    }

    get currentLob(): string {
        return this.treatyForm.get('treatyDetails.lob')?.value ?? '';
    }

    get currentTreatyType(): string {
        return this.treatyForm.get('treatyDetails.treatyType')?.value ?? '';
    }

    onSave(): void {
        if (this.treatyForm.valid) {
            const payload = this.treatyForm.getRawValue();
            console.log('Edit Treaty Saved — payload ready for API:', payload);
            this.close();
        } else {
            this.treatyForm.markAllAsTouched();
        }
    }

    // ── Reinsurer Participation helpers ────────────────────────────────────────
    get reinsurers(): FormArray {
        return this.treatyForm.get('reinsurerParticipation') as FormArray;
    }

    getReinsurerGroup(index: number): FormGroup {
        return this.reinsurers.at(index) as FormGroup;
    }

    addReinsurer(): void {
        this.reinsurers.push(this.createReinsurerGroup());
    }

    removeReinsurer(index: number): void {
        this.reinsurers.removeAt(index);
    }

    private createReinsurerGroup(): FormGroup {
        return this.fb.group({
            company: ['', Validators.required],
            capacity: [''],
            qs: [''],
            retention: [''],
            signed: [''],
            written: [''],
            broker: [''],
            tax: [''],
            comm: [''],
            reason: [''],
            description: ['']
        });
    }
    // ──────────────────────────────────────────────────────────────────────────

    private loadTreatyForEdit(): void {
        this.treatyService.getTreatyForEdit(this.treatyId).subscribe(data => {
            this.treatyForm.get('companyInfo')?.patchValue(data.companyInfo);
            this.treatyForm.get('treatyDetails')?.patchValue(data.treatyDetails);
            this.isLoading = false;
        });
    }

    private initForm(): void {
        this.treatyForm = this.fb.group({
            companyInfo: this.fb.group({
                selectedCompany: ['', Validators.required],
                companyId: [{ value: '', disabled: true }],
                accountNo: [{ value: '', disabled: true }],
                phoneNo: [{ value: '', disabled: true }],
                fax: [{ value: '', disabled: true }],
                email: [{ value: '', disabled: true }],
                address: [{ value: '', disabled: true }]
            }),
            treatyDetails: this.fb.group({
                treatyCode: [{ value: '', disabled: true }],
                description: [''],
                treatyType: ['', Validators.required],
                treatySubType: ['', Validators.required],
                currency: ['', Validators.required],
                fromDate: ['', Validators.required],
                toDate: ['', Validators.required],
                comments: [''],
                lob: ['', Validators.required],
                subLob: [''],
                isCatastropheCoverage: [false]
            }),
            reinsurerParticipation: this.fb.array([])
        });

        // Automatically reset Sub LOB when LOB changes
        this.treatyForm.get('treatyDetails.lob')?.valueChanges.subscribe(() => {
            this.treatyForm.get('treatyDetails.subLob')?.setValue('');
        });

        // Reset Sub Type when Treaty Type changes
        this.treatyForm.get('treatyDetails.treatyType')?.valueChanges.subscribe(() => {
            this.treatyForm.get('treatyDetails.treatySubType')?.setValue('');
        });
    }
}
