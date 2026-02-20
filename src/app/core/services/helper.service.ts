import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IconConfig, IconType } from '../intefaces/icon-config';

const iconConfig: Record<IconType, IconConfig> = {
  [IconType.NearExpiry]: {
    name: 'warning',
    bgClass: 'bg-yellow-100',
    colorClass: 'text-yellow-600',
    trendIcon: 'trending_down',
    trendColorClass: 'text-warning'
  },
  [IconType.PendingApproval]: {
    name: 'schedule',
    bgClass: 'bg-red-100',
    colorClass: 'text-red-600',
    trendIcon: 'error_outline',
    trendColorClass: 'text-warning'
  },
  [IconType.TravelRequest]: {
    name: 'flight',
    bgClass: 'bg-blue-100',
    colorClass: 'text-blue-600',
    trendIcon: 'trending_up',
    trendColorClass: 'text-success'
  },
  [IconType.LoanRequest]: {
    name: 'attach_money',
    bgClass: 'bg-purple-100',
    colorClass: 'text-purple-600',
    trendIcon: 'trending_up',
    trendColorClass: 'text-success'
  },
  [IconType.Processed]: {
    name: 'check_circle',
    bgClass: 'bg-green-100',
    colorClass: 'text-green-600',
    trendIcon: 'trending_up',
    trendColorClass: 'text-success'
  },
  [IconType.NewInvoice]: {
    name: 'description',
    bgClass: 'bg-indigo-100',
    colorClass: 'text-indigo-600',
    trendIcon: 'trending_up',
    trendColorClass: 'text-success'
  },
  [IconType.Submission]: {
    name: 'description',
    bgClass: 'bg-info/10',
    colorClass: 'text-info',
    trendIcon: 'trending_up',
    trendColorClass: 'text-success'
  },
  [IconType.Treaty]: {
    name: 'trending_up',
    bgClass: 'bg-success/10',
    colorClass: 'text-success',
    trendIcon: 'trending_up',
    trendColorClass: 'text-success'
  },
  [IconType.Claims]: {
    name: 'error_outline',
    bgClass: 'bg-warning/10',
    colorClass: 'text-warning',
    trendIcon: 'error_outline',
    trendColorClass: 'text-warning'
  },
  [IconType.Employees]: {
    name: 'group',
    bgClass: 'bg-accent/10',
    colorClass: 'text-accent',
    trendIcon: 'trending_up',
    trendColorClass: 'text-success'
  },
};

@Injectable({ providedIn: 'root' })
export class HelperService {

  constructor(
    private translateService: TranslateService
  ) { }

  getIcon(type: IconType): IconConfig {
    return iconConfig[type];
  }

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
