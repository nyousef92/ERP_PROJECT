import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  show(toast: Toast): void {
    this.snackBar.open(
      toast.message, '✕', {
      duration: 1000000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`${toast.type}-toast`] 
    });
  }

  hide(): void {
    this.snackBar.dismiss();
  }

  showSuccess(message: string, duration = 5000): void {
    this.show({ message, type: 'success', duration });
  }

  showError(message: string, duration = 5000): void {
    this.show({ message, type: 'error', duration });
  }

  showInfo(message: string, duration = 5000): void {
    this.show({ message, type: 'info', duration });
  }

  showWarning(message: string, duration = 5000): void {
    this.show({ message, type: 'warning', duration });
  }
}