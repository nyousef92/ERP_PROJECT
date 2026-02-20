// src/app/pipes/filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: false // Impure so it updates when array changes
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, field?: string): any[] {

    if (!items) return [];
    if (!searchText) return items;
    if (field === 'status' && searchText === 'all') {
      return items;
    }

    searchText = searchText.toLowerCase();

    if (field) {
      return items.filter(item =>
        item[field] != null && String(item[field]).toLowerCase().includes(searchText)
      );
    }
    return items.filter(item =>
      Object.values(item).some(val =>
        val != null && String(val).toLowerCase().includes(searchText)
      )
    );
  }
}
