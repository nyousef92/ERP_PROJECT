import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TreatyService } from '../../../../core/services/treaty.service';
import { FacultativeSubmissionService } from '../../../../core/services/facultative.submission.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { SelectDropdownComponent, SelectOption } from '@shared/select-dropdown/select-dropdown.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { SubDetailsManagementComponent } from './sub-details-management/sub-details-management.component';
import { SharedService } from '@core/services/shared.service';

@Component({
  selector: 'app-add-new-treaty',
  imports: [ReactiveFormsModule, InputFieldComponent, SelectDropdownComponent, ModalComponent],
  templateUrl: './add-new-treaty.component.html'
})
export class AddNewTreatyComponent implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  treatyService = inject(TreatyService);
  shared = inject(SharedService);
  facultativeSubmissionService = inject(FacultativeSubmissionService);
  fb = inject(FormBuilder);

  companyOptions: any[] = [];
  treatyTypes: any[] = [];
  lobOptions: SelectOption[] = [];
  currencies: SelectOption[] = [];
  subLobMap: Record<string, SelectOption[]> = {};
  subTypesMap: Record<string, SelectOption[]> = {};
  treatyForm!: FormGroup;

  rInsurerenceCompanies: any[] = [];

  close!: () => void;

  get rInsurerOptions(): SelectOption[] {
    return this.rInsurerenceCompanies?.map((c: any) => ({ value: c.value, label: c.value })) ?? [];
  }

  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.getTreatyData();
    this.setReInsurerenceCompanies();
    this.setLineOfBusinessOptions();
    this.geCurrencies();
  }

  geCurrencies() {
    this.shared.getCurrencies().subscribe(resp => this.currencies = resp)
  }

  setReInsurerenceCompanies(): void {
    this.treatyService.getReInsurerenceCompanies().subscribe(resp => {
      this.rInsurerenceCompanies = resp;
    });
  }

  setLineOfBusinessOptions(): void {
    this.facultativeSubmissionService.getLineOfBusinessTypes().subscribe(resp => {
      this.lobOptions = resp.map(item => ({ value: String(item.id), label: item.type }));
      this.subLobMap = resp.reduce((acc: Record<string, SelectOption[]>, item: any) => {
        acc[String(item.id)] = (item.subTypes as string[]).map(s => ({ value: s, label: s }));
        return acc;
      }, {});
    });
  }

  onCancel(): void {
    this.close();
  }

  selectCompany(companyId: string): void {
    const company = this.companyOptions.find((c: any) => String(c.id) === companyId);
    if (company) {
      this.treatyForm.get('companyInfo')?.patchValue({
        selectedCompany: String(company.id),
        companyId: company.id,
        accountNo: company.account,
        phoneNo: company.phone,
        fax: company.fax,
        email: company.email,
        address: company.address
      });
    } else {
      this.treatyForm.get('companyInfo')?.patchValue({
        selectedCompany: '',
        companyId: '', accountNo: '', phoneNo: '', fax: '', email: '', address: ''
      });
    }
  }

  // Getters for the template
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
      limit: [''],
      deductible: [''],
      premium: [''],
      subDetails: this.fb.array([])
    });
  }

  /** Returns the subDetails FormArray for a given reinsurer row index */
  getSubDetails(reinsurerIndex: number): FormArray {
    return this.getReinsurerGroup(reinsurerIndex).get('subDetails') as FormArray;
  }

  /** Badge count shown next to the Add Details link */
  getSubDetailCount(reinsurerIndex: number): number {
    return this.getSubDetails(reinsurerIndex).length;
  }

  get currentLob(): string {
    return this.treatyForm.get('treatyDetails.lob')?.value;
  }

  get currentTreatyType(): string {
    return this.treatyForm.get('treatyDetails.treatyType')?.value;
  }

  onSubmit(): void {
    console.log(this.treatyForm);
    if (this.treatyForm.valid) {
      // getRawValue() gets values including disabled fields (like companyId)
      console.log('Form Submitted:', this.treatyForm.getRawValue());
    } else {
      this.treatyForm.markAllAsTouched();
    }
  }

  AddSubDetails(reinsurerIndex: number): void {
    const fb = this.fb;
    const subDetailsArray = this.getSubDetails(reinsurerIndex);
    const existingSubDetails = subDetailsArray.getRawValue();

    this.modal.open(
      SubDetailsManagementComponent,
      {
        existingSubDetails,
        onSave: (rows: any[]) => {
          // Clear current entries and rebuild from saved rows (including excess nested data)
          subDetailsArray.clear();
          rows.forEach(row => {
            // Rebuild inline excess FormArray
            const excessArray = fb.array([] as FormGroup[]);
            if (row.excess?.length) {
              row.excess.forEach((e: any) => {
                excessArray.push(fb.group({
                  company: [e.company ?? ''],
                  signedPct: [e.signedPct ?? ''],
                  writtenPct: [e.writtenPct ?? ''],
                  brokerPct: [e.brokerPct ?? ''],
                  taxPct: [e.taxPct ?? ''],
                  commPct: [e.commPct ?? ''],
                  reason: [e.reason ?? ''],
                  description: [e.description ?? '']
                }));
              });
            }

            subDetailsArray.push(fb.group({
              company: [row.company ?? ''],
              signedPct: [row.signedPct ?? ''],
              writtenPct: [row.writtenPct ?? ''],
              brokerPct: [row.brokerPct ?? ''],
              taxPct: [row.taxPct ?? ''],
              commPct: [row.commPct ?? ''],
              reason: [row.reason ?? ''],
              description: [row.description ?? ''],
              excess: excessArray
            }));
          });
        }
      },
      'lg',
      {
        disableBackdropClose: true,
      }
    );
  }


  private getTreatyData(): void {
    this.treatyService.getTreatyCompanies().subscribe((resp) => {
      this.companyOptions = resp?.map((c: any) => ({ ...c, value: String(c.id), label: c.name })) ?? []
    });

    this.treatyService.getTreatryYypes().subscribe((resp) => {
      this.treatyTypes = resp?.map((c: any) => ({ ...c, value: String(c.id), label: c.name })) ?? []
    });

    this.treatyService.getTreatySubTypesMap().subscribe(resp => {
      this.subTypesMap = resp;
    });
  }

  private initForm(): void {
    this.treatyForm = this.fb.group({
      companyInfo: this.fb.group({
        selectedCompany: ['', Validators.required],
        // Using { value, disabled } natively handles the readonly state in Angular
        companyId: [{ value: '', disabled: true }],
        accountNo: [{ value: '', disabled: true }],
        phoneNo: [{ value: '', disabled: true }],
        fax: [{ value: '', disabled: true }],
        email: [{ value: '', disabled: true }],
        address: [{ value: '', disabled: true }]
      }),

      treatyDetails: this.fb.group({
        treatyCode: [{ value: 'Auto-generated', disabled: true }],
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
  }

  private setupDependents(): void {
    // Automatically reset Sub LOB when LOB changes
    this.treatyForm.get('treatyDetails.lob')?.valueChanges.subscribe(() => {
      this.treatyForm.get('treatyDetails.subLob')?.setValue('');
    });

    // This clears the Sub Type selection whenever the Type changes
    this.treatyForm.get('treatyDetails.treatyType')?.valueChanges.subscribe(() => {
      this.treatyForm.get('treatyDetails.treatySubType')?.setValue('');
    });
  }
}
