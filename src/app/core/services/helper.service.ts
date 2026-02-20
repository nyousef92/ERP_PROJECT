import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IconConfig, IconType, TrendConfig } from '../intefaces/icon-config';

const iconConfig: Record<IconType, IconConfig> = {
  [IconType.NearExpiry]: {
    name: 'warning',
    bgClass: 'bg-yellow-50',
    colorClass: 'text-yellow-600',
  },
  [IconType.PendingApproval]: {
    name: 'schedule',
    bgClass: 'bg-red-50',
    colorClass: 'text-red-600',
  },
  [IconType.TravelRequest]: {
    name: 'flight',
    bgClass: 'bg-blue-50',
    colorClass: 'text-blue-600',
  },
  [IconType.LoanRequest]: {
    name: 'attach_money',
    bgClass: 'bg-purple-50',
    colorClass: 'text-purple-600',
  },
  [IconType.Processed]: {
    name: 'check_circle',
    bgClass: 'bg-green-50',
    colorClass: 'text-green-600',
  },
  [IconType.NewInvoice]: {
    name: 'description',
    bgClass: 'bg-indigo-50',
    colorClass: 'text-indigo-600',
  },
  [IconType.Submission]: {
    name: 'description',
    bgClass: 'bg-info/10',
    colorClass: 'text-info',
  },
  [IconType.Treaty]: {
    name: 'trending_up',
    bgClass: 'bg-success/10',
    colorClass: 'text-success',
  },
  [IconType.Claims]: {
    name: 'error_outline',
    bgClass: 'bg-warning/10',
    colorClass: 'text-warning',
  },
  [IconType.Employees]: {
    name: 'group',
    bgClass: 'bg-accent/10',
    colorClass: 'text-accent',
  },
};

const trendConfig: Record<IconType, TrendConfig> = {
  [IconType.NearExpiry]: { trendIcon: 'trending_down', trendColorClass: 'text-warning' },
  [IconType.PendingApproval]: { trendIcon: 'error_outline', trendColorClass: 'text-warning' },
  [IconType.TravelRequest]: { trendIcon: 'trending_up', trendColorClass: 'text-success' },
  [IconType.LoanRequest]: { trendIcon: 'trending_up', trendColorClass: 'text-success' },
  [IconType.Processed]: { trendIcon: 'trending_up', trendColorClass: 'text-success' },
  [IconType.NewInvoice]: { trendIcon: 'trending_up', trendColorClass: 'text-success' },
  [IconType.Submission]: { trendIcon: 'trending_up', trendColorClass: 'text-success' },
  [IconType.Treaty]: { trendIcon: 'trending_up', trendColorClass: 'text-success' },
  [IconType.Claims]: { trendIcon: 'error_outline', trendColorClass: 'text-warning' },
  [IconType.Employees]: { trendIcon: 'trending_up', trendColorClass: 'text-success' },
};

@Injectable({ providedIn: 'root' })
export class HelperService {

  constructor(
    private translateService: TranslateService
  ) { }

  getIcon(type: IconType): IconConfig {
    return iconConfig[type];
  }

  getTrendConfig(type: IconType): TrendConfig {
    return trendConfig[type];
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
