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
  styleUrls: ['./select-dropdown.component.scss'],
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
  @Input() isNationSelect: boolean = false;
  @Input() isLanguageSelect: boolean = false;
  @Input() isReligionSelect: boolean = false;
  @Input() isFaithSelect: boolean = false;
  @Output() selectionChange = new EventEmitter<string | number>();
  @Output() faithOptionsChange = new EventEmitter<SelectOption[]>();

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
    private appDataService: AppDataService
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

    // If this is a religion select, find and emit faith options
    if (this.isReligionSelect) {
      this.handleReligionSelection(value);
    }

    this.formControl.markAsTouched();
  }

  private handleReligionSelection(religionValue: string | number) {
    const selectedReligion = this.options.find(opt => opt.value === religionValue);
    if (selectedReligion && selectedReligion.childs && selectedReligion.childs.length > 0) {
      // Map the child options and emit them
      const faithOptions = selectedReligion.childs.map(child => ({
        value: child.value,
        label: child.translations?.find((t: ReligionTranslation) => t.languageCode === 'en')?.titleText || child.defaultDescription || ''
      }));
      this.faithOptionsChange.emit(faithOptions);
    } else {
      // If no faiths available, emit empty array or default option
      this.faithOptionsChange.emit([{ value: 'none', label: 'None' }]);
    }
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

    if (this.isNationSelect) {
      this.loadNations();
    }
    if (this.isReligionSelect) {
      this.loadReligions();
    }
  }

  private loadNations() {
    this.appDataService.getNationalities().subscribe(data => {
      this.options = data.map((nation: any) => ({
        value: String(nation.value),
        id: +nation.value,
        label: nation.defaultDescription
      }));

      this.options.sort((a, b) => (String(a.label ? a.label : a.value)).localeCompare(String(b.label ? b.label : b.value)));
      if (this.value
        && this.options.find(opt => +opt.value === +this.value)
      ) {
        this.writeValue(this.value);
      }
    })

  }

  private loadReligions() {
    this.appDataService.getReligions().subscribe(data => {
      this.options = data.map((religion: IReligion) => ({
        id: religion.id,
        value: String(religion.value),
        label: religion.translations?.find((t: ReligionTranslation) => t.languageCode === 'en')?.titleText || religion.defaultDescription,
        translations: religion.translations,
        childs: religion.childs?.map((child: IReligion) => ({
          value: String(child.value),
          label: child.translations?.find((t: ReligionTranslation) => t.languageCode === 'en')?.titleText || child.defaultDescription,
          translations: child.translations,
          defaultDescription: child.defaultDescription,
          id: child.id || child.value
        })) || [],
        defaultDescription: religion.defaultDescription,
      }));
      this.writeValue(this.value);

    });

  }

  showError(): boolean {
    return !!(this.touched && this.errorMessage);
  }
}
