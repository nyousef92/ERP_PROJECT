import { Component, model } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SessionService } from '../../../core/services/session.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-profile-list',
    imports: [TranslateModule],
    templateUrl: './profile-list.component.html'
})
export class ProfileListComponent {
  showProfile = model.required<boolean>();
  notifications = ['1', '2'];
  constructor(
    private auth:AuthService,
    public session:SessionService
  ) { }

  toggleNotifications() {
    this.showProfile.update(v => !v);
  }

  logout(){
    this.auth.logout().subscribe();
  }

}
