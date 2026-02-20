export interface INotification {
  id: number;
  typeId: NotificationType
  isRead: boolean;
  createdOn: string;
  displayText: string ;
  icon: {
    icon: string,
    iconBgClass: string
  }
}

export enum NotificationType {
  NearExpiry = 1,
  PendingApproval = 2,
  TravelRequest = 3,
  LoanRequest = 4,
  Processed = 5,
  NewInvoice = 6
}

