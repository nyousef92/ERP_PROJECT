import { IconConfig, IconType } from './icon-config';

export interface INotification {
  id: number;
  iconType: IconType;
  isRead: boolean;
  createdOn: string;
  displayText: string;
  mianText?: string;
  icon: IconConfig;
}


