import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SharedService } from '@core/services/shared.service';

export interface MenuItem {
  icon?: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
    selector: 'app-sidebar',
    imports: [
        RouterLink,
        RouterLinkActive,
        HeaderComponent,
    ],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  shared = inject(SharedService);
  isExpanded = true;
  menuItems: MenuItem[] = [];

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  toggleItem(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.shared.getSideBarItems().subscribe((items) => {
      this.menuItems = items;
    })
  }
}
