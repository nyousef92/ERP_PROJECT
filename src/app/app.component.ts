import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from './core/services/toaster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  toaster = inject(ToastService)
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
