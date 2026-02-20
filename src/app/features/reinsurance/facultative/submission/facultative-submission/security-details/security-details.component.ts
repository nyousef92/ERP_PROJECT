import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputFieldComponent } from '../../../../../../shared/input-field/input-field.component';
@Component({
  selector: 'app-security-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent],
  templateUrl: './security-details.component.html'
})
export class SecurityDetailsComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      reinsuranceLiabilityClause: [''],
      orderHereon: [''],
      basisOfWritten: [''],
      basisOfSignedLine: [''],
      writtenLines: [''],
      signingProvisions: ['']
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}