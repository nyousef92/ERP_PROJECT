import { Component, model } from '@angular/core';
import { SessionService } from '@core/services/session.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-profile-list',
  imports: [],
  templateUrl: './profile-list.component.html'
})
export class ProfileListComponent {
  showProfile = model.required<boolean>();
  notifications = ['1', '2'];
  constructor(
    private auth: AuthService,
    public session: SessionService,
    private router: Router
  ) { }

  toggleNotifications() {
    this.showProfile.update(v => !v);
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['']);
    }

    );
  }

}
