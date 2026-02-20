import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './core/services/toaster.service';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  toaster = inject(ToastService);
  constructor(
    private auth: AuthService) {
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
