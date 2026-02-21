import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
import { InputFieldTextareaComponent } from '@shared/input-field-text-area/input-field-text-area.component';
import { SelectDropdownComponent } from "@shared/select-dropdown/select-dropdown.component";
import { SharedService } from '@core/services/shared.service';

@Component({
  selector: 'app-security-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent, InputFieldTextareaComponent, SelectDropdownComponent],
  templateUrl: './security-details.component.html'
})
export class SecurityDetailsComponent implements OnInit {
  form: FormGroup;

  @Output() save = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  currencyOption: any[] = [];

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    private helper: HelperService,
  ) {
    this.form = this.fb.group({
      reinsuranceLiabilityClause: ['', [Validators.required]],
      orderHereon: [''],
      cedentRetention: [''],
      reinsuranceShare: [''],
      premiumAmount: ['',Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      signingProvisions: [''],
      currency:[]

    });
  }
  ngOnInit(): void {
    this.shared.getCurrencies().subscribe(data => { this.currencyOption = data })
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
