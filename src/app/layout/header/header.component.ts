import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { ProfileListComponent } from './profile-list/profile-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NotificationsListComponent,ProfileListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isExpanded = true;
  @Output() menuToggle = new EventEmitter<void>();

  showNotifications = signal(false);
  showProfile = signal(false);

  constructor(
    private elRef: ElementRef
  ) { }

  onMenuToggle() {
    this.menuToggle.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showNotifications.set(false);
      this.showProfile.set(false)
    }
  }
}
