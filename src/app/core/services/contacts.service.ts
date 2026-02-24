import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService {

  getContactsMetrics() {
    return of([
      { label: 'Total Contacts', value: 12 },
      { label: 'Reinsurers', value: 5, ValueColorClass: 'text-info' },
      { label: 'Cedants', value: 4, ValueColorClass: 'text-success' },
      { label: 'Brokers', value: 3, ValueColorClass: 'text-warning' },
    ]);
  }

  getContacts(params: any) {
    let filtered =
      [
        {
          "contactName": "Munich Reinsurance Company",
          "phoneNo": "+49 89 38910",
          "region": "Europe",
          "email": "contact@munichre.com",
          "address": "Königinstraße 107, 80802 Munich, Germany",
          "accountNo": "ACC-MUN-001",
          "businessLine": "Property & Casualty",
          "subLine": "Commercial Property, Workers Compensation",
          "type": "Reinsurer",
          "status": "Active"
        },
        {
          "contactName": "Swiss Re Ltd",
          "phoneNo": "+41 43 285 2121",
          "region": "Europe",
          "email": "info@swissre.com",
          "address": "Mythenquai 50/60, 8022 Zurich, Switzerland",
          "accountNo": "ACC-SWI-002",
          "businessLine": "Life & Health",
          "subLine": "Term Life, Group Health",
          "type": "Reinsurer",
          "status": "Active"
        },
        {
          "contactName": "Hannover Re",
          "phoneNo": "+49 511 5604 0",
          "region": "Europe",
          "email": "info@hannover-re.com",
          "address": "Karl-Wiechert-Allee 50, 30625 Hannover, Germany",
          "accountNo": "ACC-HAN-003",
          "businessLine": "Property & Casualty, Specialty",
          "subLine": "Auto Liability, Professional Liability",
          "type": "Reinsurer",
          "status": "Active"
        },
        {
          "contactName": "Lloyd's of London",
          "phoneNo": "+44 20 7327 1000",
          "region": "Europe",
          "email": "enquiries@lloyds.com",
          "address": "One Lime Street, London EC3M 7HA, UK",
          "accountNo": "ACC-LLO-004",
          "businessLine": "Specialty",
          "subLine": "Cyber Liability",
          "type": "Broker",
          "status": "Inactive"
        }
      ];
    if (params.searchText)
      filtered = filtered.filter(i =>
        i.contactName.toLowerCase().includes(params.searchText.toLowerCase()) ||
        i.email.toLowerCase().includes(params.searchText.toLowerCase())
      );
    const start = (params.currentPage - 1) * params.pageSize;
    return of({ data: filtered.slice(start, start + params.pageSize), totalItems: filtered.length });
  }

  getContactRegions() {
    return of([
      { label: 'Europe', value: 'Europe' },
      { label: 'North America', value: 'North America' },
      { label: 'Asia Pacific', value: 'Asia Pacific' },
      { label: 'Middle East', value: 'Middle East' },
      { label: 'Africa', value: 'Africa' },
      { label: 'Latin America', value: 'Latin America' },
    ]);
  }

  getContactTypes() {
    return of([
      { label: 'Reinsurer', value: 'Reinsurer' },
      { label: 'Broker', value: 'Broker' },
      { label: 'Cedent', value: 'Cedent' },
      { label: 'Retrocessionaire', value: 'Retrocessionaire' },
    ]);
  }

  getContactStatuses() {
    return of([
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
    ]);
  }

  getBusinessLines() {
    return of([
      { label: 'Property & Casualty', value: 'Property & Casualty' },
      { label: 'Life & Health', value: 'Life & Health' },
      { label: 'Marine', value: 'Marine' },
      { label: 'Specialty', value: 'Specialty' },
      { label: 'Liability', value: 'Liability' },
      { label: 'Aviation', value: 'Aviation' },
      { label: 'Energy', value: 'Energy' },
    ]);
  }

  getSubLines() {
    return of([
      { label: 'Commercial Property', value: 'Commercial Property' },
      { label: 'Workers Compensation', value: 'Workers Compensation' },
      { label: 'Term Life', value: 'Term Life' },
      { label: 'Group Health', value: 'Group Health' },
      { label: 'Auto Liability', value: 'Auto Liability' },
      { label: 'Professional Liability', value: 'Professional Liability' },
      { label: 'Cyber Liability', value: 'Cyber Liability' },
      { label: 'Cargo', value: 'Cargo' },
      { label: 'Hull', value: 'Hull' },
    ]);
  }

  addContact(contact: any) {
    return of(contact);
  }

  updateContact(contact: any) {
    return of(contact);
  }

  deleteContact(id: string) {
    return of(true);
  }
}
