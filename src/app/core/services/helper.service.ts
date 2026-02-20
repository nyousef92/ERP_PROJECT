import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

const submissionClasses: Record<string, { trendIcon: string, trendColorClass: string, cardClass: string, labelClass: string, valueClass: string }> = {
  ['Total']: {
    trendIcon: 'trending_up',
    trendColorClass: 'text-blue-600',
    cardClass: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    labelClass: 'text-blue-700',
    valueClass: 'text-blue-900',
  },
  ['Bound']: {
    trendIcon: 'check_circle',
    trendColorClass: 'text-green-600',
    cardClass: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    labelClass: 'text-green-700',
    valueClass: 'text-green-900',
  },
  [
    'Quoted'
  ]: {
    trendIcon: 'error_outline',
    trendColorClass: 'text-sky-600',
    cardClass: 'bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200',
    labelClass: 'text-sky-700',
    valueClass: 'text-sky-900',
  },
  ['Pending']: {

    trendIcon: 'schedule',
    trendColorClass: 'text-yellow-600',
    cardClass: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
    labelClass: 'text-yellow-700',
    valueClass: 'text-yellow-900',
  }
}
const placementClasses: Record<string, { trendIcon: string, trendColorClass: string, cardClass: string, labelClass: string, valueClass: string }> = {
  ['total']: {
    trendIcon: 'description',
    trendColorClass: 'text-blue-600',
    cardClass: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    labelClass: 'text-blue-700',
    valueClass: 'text-blue-900',
  },
  ['placed']: {
    trendIcon: 'check_circle',
    trendColorClass: 'text-green-600',
    cardClass: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    labelClass: 'text-green-700',
    valueClass: 'text-green-900',
  },
  ['open']: {
    trendIcon: 'error_outline',
    trendColorClass: 'text-sky-600',
    cardClass: 'bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200',
    labelClass: 'text-sky-700',
    valueClass: 'text-sky-900',
  },
  ['in progress']: {
    trendIcon: 'schedule',
    trendColorClass: 'text-yellow-600',
    cardClass: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
    labelClass: 'text-yellow-700',
    valueClass: 'text-yellow-900',
  }
}

@Injectable({ providedIn: 'root' })
export class HelperService {

  getIcon(type: IconType): IconConfig {
    return iconConfig[type];
  }

  getTrendConfig(type: IconType): TrendConfig {
    return trendConfig[type];
  }

  getSubmissionIcon(submissionType: string) {
    return submissionClasses[submissionType];
  }

  getPlacementIcon(placementType: string) {
    console.log(placementType);
    
    return placementClasses[placementType];
  }

  getErrorsMessage(form: FormGroup, controlName: string = '', fieldLabel: string, showFormError = false): string {
    const control = form.get(controlName);
    const touched = control?.touched;
    let errors = control?.errors && touched ?
      control.errors
      : showFormError ?
        form.errors ?
          form.errors
          : null
        : null;
    if (errors) {
      if (errors['required']) return `${fieldLabel} is required`;
      if (errors['minlength']) return `${fieldLabel} must be at least ${errors['minlength'].requiredLength} characters`;
      if (errors['maxlength']) return `${fieldLabel} must not exceed ${errors['maxlength'].requiredLength} characters`;
      if (errors['min']) return `${fieldLabel} must be at least ${errors['min'].min}`;
      if (errors['max']) return `${fieldLabel} must not exceed ${errors['max'].max}`;
      if (errors['email']) return `${fieldLabel} must be a valid email address`;
      if (errors['pattern']) return `${fieldLabel} format is invalid`;
      if (errors['numberOnly']) return `${fieldLabel} must contain only numbers`;
      if (errors['dependantOn']) return `Fill ${errors['dependantOn'].depndeeFieldLabel} befor filling ${fieldLabel}`;
    }
    return '';
  }
}
