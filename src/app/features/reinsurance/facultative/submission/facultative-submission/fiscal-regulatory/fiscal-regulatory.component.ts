import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
@Component({
  selector: 'app-fiscal-regulatory',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent],
  templateUrl: './fiscal-regulatory.component.html'
})
export class FiscalRegulatoryComponent {

  form: FormGroup;
  @Input() formType = 'Create Submission';

  @Output() save = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
  ) {
    this.form = this.fb.group({
      taxPayablebyUnderWritter: [''],
      taxPayableByInsured: [''],
      premiumRate: [''],
      commission: [''],
      fees: ['']
    });
  }

  onSubmit(): void {
    this.save.emit();
  }

  getErrorMessage(controlName: string, lable: string) {
    return this.helper.getErrorsMessage(this.form, controlName, lable)
  }

  onCancel() {
    this.cancel.emit();
  }

  onSaveAsDraft() {
    this.saveDraft.emit();
  }
}
