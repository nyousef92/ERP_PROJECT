import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { HelperService } from '@core/services/helper.service';
import { ContactsService } from '@core/services/contacts.service';
import { SelectDropdownComponent, SelectOption } from '@shared/select-dropdown/select-dropdown.component';
import { InputFieldComponent } from '@shared/input-field/input-field.component';

@Component({
  selector: 'app-add-contact',
  imports: [ReactiveFormsModule, InputFieldComponent, SelectDropdownComponent],
  templateUrl: './add-contact.component.html'
})
export class AddContactComponent implements OnInit {

  close!: () => void;
  onSaved!: (contact: any) => void;
  contact?: any;

  get isEditMode() { return !!this.contact; }

  form!: FormGroup;
  regionOptions: SelectOption[] = [];
  typeOptions: SelectOption[] = [];
  statusOptions: SelectOption[] = [];
  businessLineOptions: SelectOption[] = [];
  subLineOptions: SelectOption[] = [];

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.contactsService.getContactRegions(),
      this.contactsService.getContactTypes(),
      this.contactsService.getContactStatuses(),
      this.contactsService.getBusinessLines(),
      this.contactsService.getSubLines(),
    ]).subscribe(([regions, types, statuses, businessLines, subLines]) => {
      this.regionOptions = regions;
      this.typeOptions = types;
      this.statusOptions = statuses;
      this.businessLineOptions = businessLines;
      this.subLineOptions = subLines;

      this.form = this.fb.group({
        contactName: [this.contact?.contactName ?? '', Validators.required],
        phoneNo: [this.contact?.phoneNo ?? '', Validators.required],
        region: [this.contact?.region ?? '', Validators.required],
        email: [this.contact?.email ?? '', [Validators.required, Validators.email]],
        address: [this.contact?.address ?? '', Validators.required],
        accountNo: [this.contact?.accountNo ?? '', Validators.required],
        businessLine: [this.toArray(this.contact?.businessLine), Validators.required],
        subLine: [this.toArray(this.contact?.subLine)],
        type: [this.contact?.type ?? '', Validators.required],
        status: [this.contact?.status ?? 'Active', Validators.required],
      });
    });
  }

  private toArray(val: string | string[] | undefined): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = { ...this.form.value, accountNo: this.contact?.accountNo ?? this.form.value.accountNo };
    const call = this.isEditMode
      ? this.contactsService.updateContact(formValue)
      : this.contactsService.addContact(formValue);

    call.subscribe(saved => {
      if (this.onSaved) this.onSaved(saved);
      this.close();
    });
  }

  cancel(): void {
    this.close();
  }

  getErrorMessage(controlName: string, fieldLabel: string): string {
    return this.helper.getErrorsMessage(this.form, controlName, fieldLabel);
  }
}
