import { IconConfig, IconType } from './icon-config';

export interface Metric {
  label: string;
  value: string | number;
  subtitle: string;
  icon: IconConfig;
  iconType: IconType;
  trendIcon?: string;
  trendColorClass?: string;
}
