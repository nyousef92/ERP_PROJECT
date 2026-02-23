import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
                { label: 'Progress Sheet', route: '/home/reinsurance/facultative/progress-sheet' },
                { label: 'Placement', route: '/home/reinsurance/facultative/placement' },
                { label: 'Approval', route: '/home/reinsurance/facultative/approval' },
              ]
            },
            {
              label: 'Treaty',
              children: [
                { label: 'Treaty', route: '/home/reinsurance/treaty/treaty' },
                { label: 'Claim', route: '/home/reinsurance/treaty/claim' },
                { label: 'Approval', route: '/home/reinsurance/treaty/approval' },
              ]
            },
            {
              label: 'Life',
              children: [
                { label: 'Submission', route: '/home/reinsurance/life/submission' },
                { label: 'Progress Sheet', route: '/home/reinsurance/life/progress-sheet' },
                { label: 'Placement', route: '/home/reinsurance/life/placement' },
                { label: 'Approval', route: '/home/reinsurance/life/approval' },
              ]
            },
            { label: 'Contracts', route: '/home/reinsurance/contracts' },
            { label: 'Claims', route: '/home/reinsurance/claims' },
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

  getCurrencies() {
    return of([
      { id: 1, value: "USD", label: "USD - US Dollar" },
      { id: 2, value: "EUR", label: "EUR - Euro" },
      { id: 3, value: "GBP", label: "GBP - British Pound" },
      { id: 4, value: "JPY", label: "JPY - Japanese Yen" },
      { id: 5, value: "AUD", label: "AUD - Australian Dollar" },
      { id: 6, value: "CAD", label: "CAD - Canadian Dollar" },
      { id: 7, value: "CHF", label: "CHF - Swiss Franc" },
      { id: 8, value: "CNY", label: "CNY - Chinese Yuan" },
      { id: 9, value: "INR", label: "INR - Indian Rupee" },
      { id: 10, value: "AED", label: "AED - UAE Dirham" },
    ]
    )
  }
  exportAsExcelFile(json: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }

  generatePDF(docId:string,fileName:string): void {
    const data = document.getElementById(docId); // The HTML element ID to export

    if (data) {
      html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        // 'p' for portrait, 'l' for landscape, 'cm' or 'mm' for units, 'a4' for paper size
        let pdf = new jsPDF('p', 'cm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
        pdf.save(`${fileName}.pdf`); // Name of the downloaded PDF file
      });
    } else {
      console.error(`Element with ID ${fileName} not found.`);
    }
  }

}
