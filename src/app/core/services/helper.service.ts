import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconConfig, IconType } from '../intefaces/icon-config';

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
  ['Quoted']: {
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
};

@Injectable({ providedIn: 'root' })
export class HelperService {

  getIcon(type: IconType): IconConfig {
    return iconConfig[type];
  }

  getSubmissionClasses(label: string) {
    return submissionClasses[label]
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'Bound': return 'bg-green-100 text-green-700 border-green-200';
      case 'Quoted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Submitted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Partially Approved': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  toIsoDate(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    return dateStr;
  }

}
