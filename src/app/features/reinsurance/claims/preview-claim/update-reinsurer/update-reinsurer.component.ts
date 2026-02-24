import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelperService } from '@core/services/helper.service';
import { ClaimsService } from '@core/services/claims.service';
import { SelectDropdownComponent, SelectOption } from '@shared/select-dropdown/select-dropdown.component';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { InputFieldTextareaComponent } from '@shared/input-field-text-area/input-field-text-area.component';
import { FileUploadComponent } from '@shared/file-upload/file-upload.component';

@Component({
  selector: 'app-update-reinsurer',
  imports: [ReactiveFormsModule, SelectDropdownComponent, InputFieldComponent, InputFieldTextareaComponent, FileUploadComponent],
  templateUrl: './update-reinsurer.component.html'
})
export class UpdateReinsurerComponent implements OnInit {

  reinsurer: any;
  close!: () => void;
  onSaved!: (params: any) => void;

  form!: FormGroup;
  statusOptions: SelectOption[] = [];

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private claimsService: ClaimsService
  ) { }

  ngOnInit(): void {

    this.claimsService.getClaimsStatuses().subscribe(statuses => {
      this.statusOptions = statuses;
      this.form = this.fb.group({
        status: [this.reinsurer?.status ?? '', Validators.required],
        approvedAmount: [this.reinsurer?.approvedAmount ?? '', Validators.required],
        notes: [this.reinsurer?.notes ?? ''],
        attachments: [[]]
      });
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.claimsService.updateReinsurer(this.form.value).subscribe(() => this.close());

    this.onSaved(this.form.value)
  }

  cancel(): void {
    this.close();
  }

  getErrorMessage(controlName: string, fieldLabel: string): string {
    return this.helper.getErrorsMessage(this.form, controlName, fieldLabel);
  }

}
