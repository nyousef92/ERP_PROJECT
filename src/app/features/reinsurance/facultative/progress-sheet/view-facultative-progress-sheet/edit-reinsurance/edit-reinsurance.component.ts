import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FacultativeService } from '@core/services/facultative.service';
import { HelperService } from '@core/services/helper.service';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { SelectDropdownComponent } from "@shared/select-dropdown/select-dropdown.component";

@Component({
  selector: 'app-edit-reinsurance',
  imports: [ReactiveFormsModule, InputFieldComponent, SelectDropdownComponent],
  templateUrl: './edit-reinsurance.component.html'
})
export class EditReinsuranceComponent implements OnInit {


  @Input() reinsurer: any;
  close!: () => void;
  onSaved?: (data: any) => void;
  onDelete?: (data: any) => void;

  form!: FormGroup;
  reinsurerList: any[] = [];

  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private facultativeService: FacultativeService
  ) { }

  ngOnInit(): void {
    this.facultativeService.getSecuritiesList().subscribe((data) => {
      this.reinsurerList = data

      this.form = this.fb.group({
        name: [this.reinsurer?.name ?? '', Validators.required],
        share: [this.reinsurer?.share ?? '', Validators.required],
        rate: [this.reinsurer?.rate ?? '', Validators.required],
        commission: [this.reinsurer?.commission ?? '', Validators.required],
        tax: [this.reinsurer?.tax ?? ''],
        comments: [this.reinsurer?.comments ?? ''],
      });
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.onSaved?.({
      ...this.form.value,
      name: {
        id: this.form.value.name,
        name: this.reinsurerList.find(r => +r.id === +this.form.value.name)?.label || ''
      }
    });
    this.close();
  }

  onCancel(): void {
    this.close();
  }

  updateName($event: string | number) {
    this.form.get('name')?.setValue($event);
  }

  getErrorMeassage(controlName: string, fieldLabel: string): string {
    return this.helper.getErrorsMessage(this.form, controlName, fieldLabel);
  }

  onDelet() {
    Object.assign(this.reinsurer, null);
    this.onDelete?.(this.reinsurer);
    this.close();
  }
}
