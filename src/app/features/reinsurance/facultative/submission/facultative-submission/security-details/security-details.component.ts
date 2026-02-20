import { Component, model, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
import { InputFieldTextareaComponent } from '@shared/input-field-text-area/input-field-text-area.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-security-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent, InputFieldTextareaComponent],
  templateUrl: './security-details.component.html'
})
export class SecurityDetailsComponent {
  form: FormGroup;
  collectData = model.required<boolean>();

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private router: Router
  ) {
    effect(() => {
      if (this.collectData()) {
        this.onSubmit();
      }
    });

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

  }

  getErrorMessage(controlName: string, lable: string) {
    return this.helper.getErrorsMessage(this.form, controlName, lable)
  }

  onCancel() {
    this.router.navigate(['//home/reinsurance/facultative/submission'])
  }

  onSaveAsDraft() {
    console.log(this.form.value);
  }
}
