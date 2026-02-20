import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  api = inject(ApiService);

  getSideBarItems() {
    //return this.api.get('');
    return of(
      [
        {
          icon: 'dashboard',
          label: 'Dashboard',
          route: '/home/dashboard'
        },
        {
          icon: 'shield',
          label: 'Reinsurance',
          children: [
            {
              label: 'Facultative',
              children: [
                { label: 'Submission', route: '/home/reinsurance/facultative/submission' },
                { label: 'Progress Sheet', route: '/reinsurance/facultative/progress-sheet' },
                { label: 'Placement', route: '/reinsurance/facultative/placement' },
                { label: 'Approval', route: '/reinsurance/facultative/approval' },
              ]
            },
            {
              label: 'Treaty',
              children: [
                { label: 'Treaty', route: '/reinsurance/treaty/treaty' },
                { label: 'Claim', route: '/reinsurance/treaty/claim' },
                { label: 'Approval', route: '/reinsurance/treaty/approval' },
              ]
            },
            {
              label: 'Life',
              children: [
                { label: 'Submission', route: '/reinsurance/life/submission' },
                { label: 'Progress Sheet', route: '/reinsurance/life/progress-sheet' },
                { label: 'Placement', route: '/reinsurance/life/placement' },
                { label: 'Approval', route: '/reinsurance/life/approval' },
              ]
            },
            { label: 'Contracts', route: '/reinsurance/contracts' },
            { label: 'Claims', route: '/reinsurance/claims' },
            { label: 'Contacts', route: '/reinsurance/contacts' },
          ]
        },
        {
          icon: 'attach_money',
          label: 'Finance',
          children: [
            {
              label: 'Re-insurance Finance',
              children: [
                { label: 'Journals', route: '/finance/reinsurance/journals' },
                {
                  label: 'Revenue Recognition',
                  children: [
                    { label: 'Details', route: '/finance/reinsurance/revenue/details' },
                    { label: 'Journals', route: '/finance/reinsurance/revenue/journals' },
                  ]
                },
                { label: 'Settlement Hub', route: '/finance/reinsurance/settlement' },
              ]
            },
            {
              label: 'Internal Finance',
              children: [
                { label: 'Journals', route: '/finance/internal/journals' },
                { label: 'Payables', route: '/finance/internal/payables' },
                {
                  label: 'Multiperiod Accounting',
                  children: [
                    { label: 'Prepaid Expense Recognition Details', route: '/finance/internal/multiperiod/details' },
                    { label: 'Prepaid Expense Recognition Journals', route: '/finance/internal/multiperiod/journals' },
                  ]
                },
                { label: 'Cash Management', route: '/finance/internal/cash' },
                { label: 'Assets', route: '/finance/internal/assets' },
              ]
            },
            {
              label: 'Configurations',
              children: [
                { label: 'Chart of Accounts', route: '/finance/config/chart-of-accounts' },
                { label: 'Currencies', route: '/finance/config/currencies' },
                { label: 'Periods', route: '/finance/config/periods' },
                { label: 'Tax', route: '/finance/config/tax' },
              ]
            },
          ]
        },
        {
          icon: 'group',
          label: 'Human Resources',
          route: '/hr'
        },
        {
          icon: 'business',
          label: 'Party Management',
          route: '/party-management'
        },
        {
          icon: 'handshake',
          label: 'Partner Portal',
          route: '/partner-portal'
        },
        {
          icon: 'fact_check',
          label: 'Internal Audit',
          children: [
            { label: 'Audit Overview', route: '/audit/overview' },
            { label: 'Master Setup', route: '/audit/master-setup' },
            { label: 'Audit Execution', route: '/audit/execution' },
            { label: 'Annual Audit Plan', route: '/audit/annual-plan' },
          ]
        },
        {
          icon: 'verified_user',
          label: 'Compliance',
          route: '/compliance'
        },
        {
          icon: 'manage_accounts',
          label: 'User Management',
          route: '/user-management'
        },
        {
          icon: 'bar_chart',
          label: 'Reports',
          route: '/reports'
        },
      ]
    );
  }

  getActivityTypes() {
    //return this.api.get('');
    return of(['All', 'Submission', 'Claim', 'Treaty', 'HR', 'Finance', 'Audit']);
  }
  getModuleTypes() {
    //return this.api.get('');
    return of(['All', 'Reinsurance', 'Claims', 'Finance', 'HR', 'Audit', 'Reports']);
  }

}
