// src/app/pipes/filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: false // Impure so it updates when array changes
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, fieldName: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const value = fieldName ? item[fieldName] : item;
      return value?.toString().toLowerCase().includes(searchText);
    });
  }
}
