import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class HelperService {

  constructor(
    private translateService: TranslateService
  ) { }

  getErrorsMessage(form: FormGroup, controlName: string = '', key: string, showFormError = false): string {
    const control = form.get(controlName);
    const touched = control?.touched;
    const fieldLabel = this.translateService.instant(key);
    let errors = control?.errors && touched ?
      control.errors
      : showFormError ?
        form.errors ?
          form.errors
          : null
        : null;
    if (errors) {
      if (errors['required']) {
        return this.translateService.instant('validation.required', { field: fieldLabel });
      }
      if (errors['minlength']) {
        return this.translateService.instant('validation.minlength', {
          field: fieldLabel,
          min: errors['minlength'].requiredLength
        });
      }
      if (errors['maxlength']) {
        return this.translateService.instant('validation.maxlength', {
          field: fieldLabel,
          max: errors['maxlength'].requiredLength
        });
      }
      if (errors['min']) {
        return this.translateService.instant('validation.min', {
          field: fieldLabel,
          min: errors['min'].min
        });
      }
      if (errors['max']) {
        return this.translateService.instant('validation.max', {
          field: fieldLabel,
          max: errors['max'].max
        });
      }
      if (errors['email']) {
        return this.translateService.instant('validation.email', { field: fieldLabel });
      }
      if (errors['pattern']) {
        return this.translateService.instant('validation.pattern', { field: fieldLabel });
      }
      if (errors['numberOnly']) {
        return this.translateService.instant('validation.numberOnly', { field: fieldLabel });
      }
    }
    return '';
  }

}
