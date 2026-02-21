import { Component, inject, OnInit } from '@angular/core';
import { TreatyService } from '../../../../core/services/treaty.service';
import { NgClass } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';

@Component({
  selector: 'app-add-new-treaty',
  imports: [ReactiveFormsModule, InputFieldComponent, NgClass],
  templateUrl: './add-new-treaty.component.html'
})
export class AddNewTreatyComponent implements OnInit {
  treatyService = inject(TreatyService);
  fb = inject(FormBuilder);

  treatyData!: any;
  treatyForm!: FormGroup;

  close!: () => void;

  ngOnInit(): void {
    this.initForm();
    this.getTreatyData();
  }

  onCancel(): void {
    this.close();
  }

  // Helper method to simulate selecting a company from a dropdown/modal
  selectCompany(companyId: string): void {
    const company = this.treatyData.companies.find((c: any) => c.id === companyId);
    if (company) {
      this.treatyForm.get('companyInfo')?.patchValue({
        selectedCompany: company.id,   // must match the option [value] so the select renders correctly
        companyId: company.id,
        accountNo: company.account,
        phoneNo: company.phone,
        fax: company.fax,
        email: company.email,
        address: company.address
      });
    } else {
      // User picked the blank "Select Company" option — clear the dependent fields
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
      premium: ['']
    });
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

  private getTreatyData(): void {
    this.treatyService.getCreateNewTreateData().subscribe(resp => {
      this.treatyData = resp;
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

