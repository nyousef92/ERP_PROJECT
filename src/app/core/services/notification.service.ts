import { Injectable, signal, WritableSignal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { map, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { environment } from '../../../environments/environment';
import { INotification, NotificationType } from '../intefaces/notification';
import { ToastService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: HubConnection;

  private readonly hubUrl = `${environment.authUrl}/notificationHub`;
  private readonly notificationurl = `${environment.authUrl}/Notification`;

  notifications: WritableSignal<INotification[]> = signal<INotification[]>([
    {
      id: 1,
      typeId: NotificationType.NearExpiry,
      isRead: false,
      createdOn: '2026-02-10T08:30:00Z',
      displayText: 'Reinsurance contract #RI-2024-102 is near expiry.',
      icon: {
        icon: 'warning',
        iconBgClass: 'bg-yellow-100 text-yellow-600'
      }
    },
    {
      id: 2,
      typeId: NotificationType.PendingApproval,
      isRead: false,
      createdOn: '2026-02-12T10:15:00Z',
      displayText: 'Policy endorsement request is pending your approval.',
      icon: {
        icon: 'schedule',
        iconBgClass: 'bg-orange-100 text-orange-600'
      }
    },
    {
      id: 3,
      typeId: NotificationType.TravelRequest,
      isRead: true,
      createdOn: '2026-02-09T14:00:00Z',
      displayText: 'Travel request for Dubai business trip submitted.',
      icon: {
        icon: 'flight',
        iconBgClass: 'bg-blue-100 text-blue-600'
      }
    },
    {
      id: 4,
      typeId: NotificationType.LoanRequest,
      isRead: true,
      createdOn: '2026-02-08T09:20:00Z',
      displayText: 'Loan request for employee ID 245 has been created.',
      icon: {
        icon: 'attach_money',
        iconBgClass: 'bg-purple-100 text-purple-600'
      }
    },
    {
      id: 5,
      typeId: NotificationType.Processed,
      isRead: true,
      createdOn: '2026-02-07T11:45:00Z',
      displayText: 'Claim #CL-99821 has been successfully processed.',
      icon: {
        icon: 'check_circle',
        iconBgClass: 'bg-green-100 text-green-600'
      }
    },
    {
      id: 6,
      typeId: NotificationType.NewInvoice,
      isRead: false,
      createdOn: '2026-02-13T13:05:00Z',
      displayText: 'New invoice #INV-5543 has been generated.',
      icon: {
        icon: 'description',
        iconBgClass: 'bg-indigo-100 text-indigo-600'
      }
    }
  ]);

  constructor(
    private ApiService: ApiService,
    private toast: ToastService,
    private session: SessionService
  ) {
     //this.initializeConnection();
  }

  getOlderNotification() {
    this.ApiService.get<INotification[]>(`${this.notificationurl}/Get`)
      .pipe(
        map((items) => {
          if (items && items.length) {
            const allNotifications = items.map((item) => {
              const notificationConfig: Record<NotificationType, { icon: string; iconBgClass: string }> = {
                [NotificationType.NearExpiry]: {
                  icon: 'person_check',
                  iconBgClass: 'bg-yellow-100 text-yellow-600'
                },
                [NotificationType.PendingApproval]: {
                  icon: 'schedule',
                  iconBgClass: 'bg-red-100 text-red-600'
                },
                [NotificationType.TravelRequest]: {
                  icon: 'flight',
                  iconBgClass: 'bg-blue-100 text-blue-600'
                },
                [NotificationType.LoanRequest]: {
                  icon: 'attach_money',
                  iconBgClass: 'bg-red-100 text-red-600'
                },
                [NotificationType.Processed]: {
                  icon: 'check_circle',
                  iconBgClass: 'bg-green-100 text-green-600'
                },
                [NotificationType.NewInvoice]: {
                  icon: 'description',
                  iconBgClass: 'bg-blue-100 text-blue-600'
                },
              };

              return {
                ...item,
                icon: notificationConfig[item.typeId]
              }
            });
            return allNotifications;
          }
          return [];
        }
        )
      )
      .subscribe({
        next: (notifications) => {
          this.notifications.set(notifications);
        }
      });
  }

  private initializeConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        headers: this.ApiService.headersValue
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build();
    this.startConnection();
    this.addListeners();
  }

  private async startConnection() {
    try {
      await this.hubConnection.start();
    } catch (error) {
      console.error('Failed to start connection:', error);
      setTimeout(() => this.startConnection(), 5000);
    }
  }

  private addListeners() {
    this.hubConnection.on('ReceiveInboxNotification', (data: any) => {
      data = JSON.parse(data);
      this.toast.showInfo(data.Message);
      this.getOlderNotification();
    });

    this.hubConnection.on('ReceiveGeneralNotification', (data: any) => {
      data = JSON.parse(data);
      this.toast.showInfo(data.Message);
      this.getOlderNotification();
    });

  }

  public sendMessage(message: any): void {
    this.hubConnection.invoke('SendMessage', message)
      .catch(err => console.error('Error sending message:', err));
  }

  ngOnDestroy() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  markAsRead(notificationId: number) {
    return this.ApiService.put(`${this.notificationurl}/Read?notificationId=${notificationId}`).pipe(
      switchMap(resp => {
        if (resp) {
          this.getOlderNotification()
        }
        return of(resp)
      })
    )
  }
}
