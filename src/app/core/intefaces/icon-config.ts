export interface IconConfig {
  name: string;
  bgClass: string;
  colorClass: string;
  trendIcon?: string;
  trendColorClass?: string;
}

export enum IconType {
  NearExpiry = 1,
  PendingApproval = 2,
  TravelRequest = 3,
  LoanRequest = 4,
  Processed = 5,
  NewInvoice = 6,
  Submission = 7,
  Treaty = 8,
  Claims = 9,
  Employees = 10
}