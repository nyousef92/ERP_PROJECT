import { Component, effect, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fiscal-regulatory',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent],
  templateUrl: './fiscal-regulatory.component.html'
})
export class FiscalRegulatoryComponent {

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
      taxPayablebyUnderWritter: [''],
      taxPayableByInsured: [''],
      premiumRate: [''],
      commission: [''],
      fees: ['']
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
