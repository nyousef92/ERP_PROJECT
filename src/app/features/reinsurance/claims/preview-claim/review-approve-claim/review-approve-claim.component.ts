import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClaimsService } from '@core/services/claims.service';
import { HelperService } from '@core/services/helper.service';
import { InputFieldTextareaComponent } from '@shared/input-field-text-area/input-field-text-area.component';

@Component({
  selector: 'app-review-approve-claim',
  imports: [ReactiveFormsModule, InputFieldTextareaComponent],
  templateUrl: './review-approve-claim.component.html'
})
export class ReviewApproveClaimComponent implements OnInit {

  claim: any;
  close!: () => void;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private claimService: ClaimsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      comments: ['', Validators.required]
    });
  }

  approve(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.claimService.approve(this.claim.id).subscribe(() => this.close());
  }

  reject(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.claimService.reject(this.claim.id).subscribe(() => this.close());

  }

  cancel(): void {
    this.close();
  }

  getErrorMessage(controlName: string, fieldLabel: string): string {
    return this.helper.getErrorsMessage(this.form, controlName, fieldLabel);
  }

}
