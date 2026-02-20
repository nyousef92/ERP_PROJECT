import { Component, Input, Output, EventEmitter, forwardRef, OnInit, Inject } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

export interface SelectOption {
  id: number | string,
  value: number | string,
  label: string
}
@Component({
  selector: 'app-select-dropdown',

  imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './select-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDropdownComponent),
      multi: true
    }
  ]
})
export class SelectDropdownComponent implements ControlValueAccessor, OnInit {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Select';
  @Input() label?: string;
  @Input() required?: boolean;
  @Input() errorMessage?: string;
  @Input() touched?: boolean;
  @Output() selectionChange = new EventEmitter<string | number>();

  @Input() set selectedValue(value: string | number) {
    this.value = value;
    this.formControl.setValue(value?.toString() || '', { emitEvent: false });
  }
  get selectedValue(): string | number {
    return this.value;
  }


  private _disabled = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }

  value: string | number = '';
  formControl = new FormControl<string>('');

  onChange = (value: string | number) => { };
  onTouched = () => { };

  constructor(
  ) { }

  get formControlErrors(): string | null {
    if (this.formControl.errors) {
      if (this.formControl.errors['required']) {
        return 'This field is required.';
      }
      // Add other error types as needed
    }
    return null;
  }

  writeValue(value: string | number): void {

    this.value = value || '';
    // Use a small delay to allow options to render before setting the value
    setTimeout(() => {
      this.formControl.setValue(this.value?.toString() || '', { emitEvent: false });
    });
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
    this.formControl.valueChanges.subscribe((value: string | null) => {
      this.onChange(value || '');
    });
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: any) {
    const value = event?.value || event?.target?.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.selectionChange.emit(value);

    this.formControl.markAsTouched();
  }


  onFocus() {
    this.formControl.markAsTouched();  // Mark as touched when the select field is focused
  }

  ngOnInit() {
    // Always initialize with empty value to show placeholder
    if (!this.selectedValue) {
      this.writeValue('');
    } else {
      this.writeValue(this.selectedValue)
    }
  }



  showError(): boolean {
    return !!(this.touched && this.errorMessage);
  }
}
