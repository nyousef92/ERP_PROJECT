import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-two-factor-auth',
  imports: [ReactiveFormsModule, InputFieldComponent],
  templateUrl: './two-factor-auth.component.html'
})
export class TwoFactorAuthComponent {


  fb = inject(FormBuilder);
  helper = inject(HelperService);
  auth = inject(AuthService);
  router = inject(Router);
  loginForm!: FormGroup;
  loginClick: Subject<void> = new Subject();
  navState: any;

  ngOnInit(): void {
    this.navState = history.state.body;
    console.log(this.navState);

    if (this.navState) {
      this.loginForm = this.fb.group({
        password: ['', Validators.required]
      })
      this.addEventListener();
    } else {
      this.router.navigate(['/']);
    }
  }


  addEventListener() {
    this.loginClick.pipe(exhaustMap(() => this.doLogin()))
      .subscribe(resp => {
        if (resp)
          this.router.navigate(['/home'])
      });
  }

  getErrorMessage(controlName: string, controlKey: string) {
    if (this.loginForm.get(controlName)?.touched) {
      return this.loginForm.get(controlName)?.invalid ?
        this.helper.getErrorsMessage(this.loginForm, controlName, controlKey)
        : '';
    }
    return '';
  }

  doLogin() {
    if ((this.loginForm.invalid)) {
      this.loginForm.markAllAsTouched();
      return of(false);
    }
    return this.auth.login(this.navState);
  }

}

