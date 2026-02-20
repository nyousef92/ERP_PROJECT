import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Observable, of } from 'rxjs';
import { INotification } from '../intefaces/notification';
import { IconType } from '../intefaces/icon-config';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private apiService: ApiService,
    private helper: HelperService
  ) { }

  getCharts(payload: any) {
    //return this.apiService.post('',payload)
    return of({
      monthlySubmissions: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          { label: 'Submissions', data: [30, 45, 60, 50, 75, 90, 85, 100, 95, 110, 120, 245] },
          { label: 'Approved', data: [20, 35, 50, 40, 60, 70, 65, 80, 75, 90, 100, 200] }
        ]
      },
      claimsByStatus: {
        labels: ['Approved', 'Pending', 'Rejected', 'Under Review'],
        data: [120, 32, 15, 28]
      },
      treatyDistribution: {
        labels: ['Proportional', 'Excess of Loss', 'Quota Share', 'Surplus', 'Facultative'],
        data: [5, 4, 3, 3, 3]
      },
      employeeGrowth: {
        labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
        datasets: [
          { label: 'Employees', data: [120, 130, 140, 148, 156] }
        ]
      }
    });
  }

  getActivities(payload: any): Observable<INotification[]> {
    //return this.apiService.post<Notification[]>('',payload)
    return of([
      {
        id: 1,
        iconType: IconType.Submission,
        isRead: false,
        createdOn: '5 minutes ago',
        displayText: 'FAC-2024-067 - Global Manufacturing Inc.',
        mianText: 'New Submission Created',
        icon: this.helper.getIcon(IconType.Submission)
      },
      {
        id: 2,
        iconType: IconType.Claims,
        isRead: false,
        createdOn: '15 minutes ago',
        displayText: 'CLM-2024-123 - Property damage claim processed',
        mianText: 'Claim Approved',
        icon: this.helper.getIcon(IconType.Claims)
      },
      {
        id: 3,
        iconType: IconType.Treaty,
        isRead: true,
        createdOn: '1 hour ago',
        displayText: 'TRT-2024-045 - Annual property treaty renewal',
        mianText: 'Treaty Renewed',
        icon: this.helper.getIcon(IconType.Treaty)
      },
      {
        id: 4,
        iconType: IconType.Employees,
        isRead: true,
        createdOn: '2 hours ago',
        displayText: 'Sarah Johnson joined as Underwriter',
        mianText: 'Employee Onboarded',
        icon: this.helper.getIcon(IconType.Employees)
      }
    ]);
  }

  getMetric(payload: any) {
    //return this.apiService.post('',payload)
    return of([
      {
        label: 'Total Submissions',
        value: 245,
        subtitle: '+12% from last month',
        iconType: IconType.Submission,
        icon: this.helper.getIcon(IconType.Submission),
      },
      {
        label: 'Active Treaties',
        value: 18,
        subtitle: '3 pending renewal',
        iconType: IconType.Treaty,
        icon: this.helper.getIcon(IconType.Treaty),
      },
      {
        label: 'Pending Claims',
        value: 32,
        subtitle: '5 require attention',
        iconType: IconType.Claims,
        icon: this.helper.getIcon(IconType.Claims),
      },
      {
        label: 'Total Employees',
        value: 156,
        subtitle: '8 new this quarter',
        iconType: IconType.Employees,
        icon: this.helper.getIcon(IconType.Employees),
      },
    ]);
  }
}
