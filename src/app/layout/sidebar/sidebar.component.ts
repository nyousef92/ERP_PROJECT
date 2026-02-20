import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

export interface MenuItem {
  icon?: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    HeaderComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isExpanded = true;

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  toggleItem(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    {
      icon: 'inventory_2', label: 'Inventory',
      children: [
        { label: 'Products', route: '/inventory/products' },
        { label: 'Warehouses', route: '/inventory/warehouses' },
        {
          label: 'Stock',
          children: [
            {
              label: 'Stock In', route: '/inventory/stock/in',
              children: [
                { label: 'Stock In', route: '/inventory/stock/in' },
              ]
            },
            { label: 'Stock Out', route: '/inventory/stock/out' },
            { label: 'Adjustments', route: '/inventory/stock/adjustments' },
          ]
        },
      ]
    },
    {
      icon: 'shopping_cart', label: 'Sales', children: [
        { label: 'Orders', route: '/sales/orders' },
        { label: 'Invoices', route: '/sales/invoices' },
        { label: 'Customers', route: '/sales/customers' },
      ]
    },
    {
      icon: 'local_shipping', label: 'Purchases', children: [
        { label: 'Orders', route: '/purchases/orders' },
        { label: 'Bills', route: '/purchases/bills' },
        { label: 'Vendors', route: '/purchases/vendors' },
      ]
    },
    {
      icon: 'account_balance', label: 'Accounting', children: [
        { label: 'Journal Entries', route: '/accounting/journal' },
        { label: 'Chart of Accounts', route: '/accounting/accounts' },
        {
          label: 'Reports', children: [
            { label: 'Balance Sheet', route: '/accounting/reports/balance-sheet' },
            { label: 'Income Statement', route: '/accounting/reports/income' },
            { label: 'Cash Flow', route: '/accounting/reports/cash-flow' },
          ]
        },
      ]
    },
    {
      icon: 'people', label: 'HR', children: [
        { label: 'Employees', route: '/hr/employees' },
        { label: 'Payroll', route: '/hr/payroll' },
        { label: 'Attendance', route: '/hr/attendance' },
      ]
    },
    { icon: 'assessment', label: 'Reports', route: '/reports' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];
}
