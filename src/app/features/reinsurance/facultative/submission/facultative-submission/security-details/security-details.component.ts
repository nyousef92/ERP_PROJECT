import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
import { InputFieldTextareaComponent } from '@shared/input-field-text-area/input-field-text-area.component';
@Component({
  selector: 'app-security-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent, InputFieldTextareaComponent],
  templateUrl: './security-details.component.html'
})
export class SecurityDetailsComponent {
  form: FormGroup;

  @Output() save = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
  ) {
    this.form = this.fb.group({
      reinsuranceLiabilityClause: ['', [Validators.required]],
      orderHereon: [''],
      basisOfWritten: [''],
      basisOfSignedLine: [''],
      writtenLines: [''],
      signingProvisions: ['']
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
