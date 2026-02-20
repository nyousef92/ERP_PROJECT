
export interface BreadcrumbItem {
  label: string;
  url?: string;
}

import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: '/' | '>' | '»' = '/';
}