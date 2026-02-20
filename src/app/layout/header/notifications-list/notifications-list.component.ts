import { Component, computed, model } from '@angular/core';
import { INotification } from '../../../core/intefaces/notification';
import { NgClass } from '@angular/common';
import { SignalRService } from '../../../core/services/notification.service';

@Component({
    selector: 'app-notifications-list',
    imports: [NgClass],
    templateUrl: './notifications-list.component.html'
})
export class NotificationsListComponent {

  showNotifications = model.required<any>();
  unreadCount = computed(() => this.signalR.notifications().filter(n => !n.isRead).length);

  constructor(
    public signalR: SignalRService
  ) { }

  toggleNotifications() {
    this.showNotifications.update(v => !v);
  }

  markAsRead(notification: INotification) {
    if (!notification.isRead) {
      this.signalR.markAsRead(notification.id).subscribe();
    }
  }
}
