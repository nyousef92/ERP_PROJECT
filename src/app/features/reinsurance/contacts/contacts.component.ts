import { Component, OnInit, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { PaginatorComponent } from '@shared/paginator/paginator.component';
import { CardsGridComponent } from '@shared/cards-grid/cards-grid.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { DeleteItemComponent } from '@shared/delete-item/delete-item.component';
import { HelperService } from '@core/services/helper.service';
import { ContactsService } from '@core/services/contacts.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-contacts',
  imports: [NgClass, CardsGridComponent, InputFieldComponent, PaginatorComponent, ModalComponent],
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent;

  searchText = '';
  metrics: any[] = [];
  contacts: any[] = [];
  totalItems = 0;

  constructor(
    private helper: HelperService,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.contactsService.getContactsMetrics(),
      this.contactsService.getContacts({ pageSize: 6, currentPage: 1, searchText: '' })
    ]).subscribe(([metrics, list]) => {
      this.metrics = metrics;
      this.contacts = list.data.map(item => ({ ...item, statusClasses: this.helper.getStatusClass(item.status) }));
      this.totalItems = list.totalItems;
    });
  }

  updateSearchValue(value: string) {
    this.searchText = value;
    this.getContacts();
  }

  getContacts(currentPage = 1) {
    this.contactsService.getContacts({ pageSize: 6, currentPage, searchText: this.searchText })
      .subscribe(resp => {
        this.contacts = resp.data.map(item => ({ ...item, statusClasses: this.helper.getStatusClass(item.status) }));
        this.totalItems = resp.totalItems;
      });
  }

  addNew() {
    this.modal.open(AddContactComponent, {
      onSaved: (contact: any) => {
        this.contacts = [
          { ...contact, statusClasses: this.helper.getStatusClass(contact.status) },
          ...this.contacts
        ];
        this.totalItems++;
      }
    }, 'lg');
  }

  editContact(accountNo: string) {
    const contact = this.contacts.find(c => c.accountNo === accountNo);
    if (!contact) return;
    this.modal.open(AddContactComponent, {
      contact,
      onSaved: (updated: any) => {
        const idx = this.contacts.findIndex(c => c.accountNo === accountNo);
        if (idx !== -1) {
          this.contacts[idx] = { ...this.contacts[idx], ...updated, statusClasses: this.helper.getStatusClass(updated.status) };
        }
      }
    }, 'lg');
  }

  deleteItem(accountNo: string) {
    this.modal.open(DeleteItemComponent, {
      description: `Are you sure you want to delete this contact?`,
      onDelete: () => {
        this.contactsService.deleteContact(accountNo).subscribe(() => {
          this.contacts = this.contacts.filter(c => c.accountNo !== accountNo);
          this.totalItems--;
        });
      }
    }, 'sm');
  }
}
