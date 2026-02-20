import { Injectable, signal, WritableSignal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { map, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { HelperService } from './helper.service';
import { environment } from '../../../environments/environment';
import { INotification } from '../intefaces/notification';
import { ToastService } from './toaster.service';
import { IconType } from '../intefaces/icon-config';

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
      iconType: IconType.NearExpiry,
      isRead: false,
      createdOn: '2026-02-10T08:30:00Z',
      displayText: 'Reinsurance contract #RI-2024-102 is near expiry.',
      icon: { name: 'warning', bgClass: 'bg-yellow-100', colorClass: 'text-yellow-600' }
    },
    {
      id: 2,
      iconType: IconType.PendingApproval,
      isRead: false,
      createdOn: '2026-02-12T10:15:00Z',
      displayText: 'Policy endorsement request is pending your approval.',
      icon: { name: 'schedule', bgClass: 'bg-orange-100', colorClass: 'text-orange-600' }
    },
    {
      id: 3,
      iconType: IconType.TravelRequest,
      isRead: true,
      createdOn: '2026-02-09T14:00:00Z',
      displayText: 'Travel request for Dubai business trip submitted.',
      icon: { name: 'flight', bgClass: 'bg-blue-100', colorClass: 'text-blue-600' }
    },
    {
      id: 4,
      iconType: IconType.LoanRequest,
      isRead: true,
      createdOn: '2026-02-08T09:20:00Z',
      displayText: 'Loan request for employee ID 245 has been created.',
      icon: { name: 'attach_money', bgClass: 'bg-purple-100', colorClass: 'text-purple-600' }
    },
    {
      id: 5,
      iconType: IconType.Processed,
      isRead: true,
      createdOn: '2026-02-07T11:45:00Z',
      displayText: 'Claim #CL-99821 has been successfully processed.',
      icon: { name: 'check_circle', bgClass: 'bg-green-100', colorClass: 'text-green-600' }
    },
    {
      id: 6,
      iconType: IconType.NewInvoice,
      isRead: false,
      createdOn: '2026-02-13T13:05:00Z',
      displayText: 'New invoice #INV-5543 has been generated.',
      icon: { name: 'description', bgClass: 'bg-indigo-100', colorClass: 'text-indigo-600' }
    }
  ]);

  constructor(
    private ApiService: ApiService,
    private toast: ToastService,
    private session: SessionService,
    private helper: HelperService
  ) {
    //this.initializeConnection();
  }

  getOlderNotification() {
    this.ApiService.get<INotification[]>(`${this.notificationurl}/Get`)
      .pipe(
        map((items) => {
          if (items && items.length) {
            return items.map((item) => ({
              ...item,
              icon: this.helper.getIcon(item.iconType)
            }));
          }
          return [];
        })
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
