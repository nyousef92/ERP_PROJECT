import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  getContractsMetric(){
    return of( [
      { label: 'Total Records', value: 4 },
      { label: 'Active', value: 2 },
      { label: 'Pending', value: 1 },
      { label: 'This Month', value: 2 },
    ])
  }

  getContractsHisroty(params: { pageSize: number; currentPage: number; searchText: string }) {
    const data = [
      { id: '001', name: 'Sample Item 1', status: 'Active',   date: '2024-11-20', value: '$10,000' },
      { id: '002', name: 'Sample Item 2', status: 'Pending',  date: '2024-11-21', value: '$15,000' },
      { id: '003', name: 'Sample Item 3', status: 'Active',   date: '2024-11-22', value: '$20,000' },
      { id: '004', name: 'Sample Item 4', status: 'Inactive', date: '2024-11-23', value: '$12,000' },
    ];
    const filtered = params.searchText
      ? data.filter(i => i.name.toLowerCase().includes(params.searchText.toLowerCase()))
      : data;
    const start = (params.currentPage - 1) * params.pageSize;
    return of({ data: filtered.slice(start, start + params.pageSize), totalItems: filtered.length });
  }

  deleteContract(id:string){
    return of(true);
  }
}
