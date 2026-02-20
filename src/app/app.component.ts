import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './core/services/toaster.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  toaster = inject(ToastService);
  constructor(
    private translate: TranslateService,
    private auth: AuthService) {
    translate.use('en');
  }
  title = 'ERP';

  ngOnInit(): void {
    // | 'error' | 'info' | 'warning';
    this.toaster.show(
      {
        message: 'string',
        type: 'success',
        duration: 3000
      }
    );
  }
}
