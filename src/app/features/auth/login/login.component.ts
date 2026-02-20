import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '../../../shared/input-field/input-field.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HelperService } from '../../../core/services/helper.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { exhaustMap} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, InputFieldComponent, TranslateModule, TranslatePipe],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  fb = inject(FormBuilder);
  helper = inject(HelperService);
  auth = inject(AuthService);
  router = inject(Router);
  loginForm!: FormGroup;
  loginClick: Subject<void> = new Subject();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.addEventListener();
  }


  addEventListener() {
    this.loginClick.pipe(exhaustMap(()=> this.doLogin()))
      .subscribe(resp => {
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
    const body = this.loginForm.value;
   return this.auth.login(body)
  }

}
