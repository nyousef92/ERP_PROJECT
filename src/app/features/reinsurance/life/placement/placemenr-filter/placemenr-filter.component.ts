import { Component, Output, EventEmitter, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { SelectDropdownComponent } from "@shared/select-dropdown/select-dropdown.component";
import { PlacementService } from '@core/services/placement.service';
import { forkJoin } from 'rxjs';

export interface PlacementFilterState {
  dateFrom: string | null;
  dateTo: string | null;
  refNo: string | null;
  cedant: string | null;
  type: string | null;
  status: string | null;
}

@Component({
  selector: 'app-placemenr-filter',
  imports: [FormsModule, InputFieldComponent, SelectDropdownComponent],
  templateUrl: './placemenr-filter.component.html'
})
export class PlacemenrFilterComponent implements OnInit {

  showFilters = model<boolean>(false);

  dateFrom: string = '';
  type: string = '';
  dateTo: string = '';
  refNo: string = '';
  cedant: string = '';
  status: string = '';

  @Output() filterChange = new EventEmitter<PlacementFilterState>();

  activeCount: number = 0;
  activeTags: { key: string; label: string; value: string }[] = [];
  typeOptions: any;
  statusOptions: any;

  constructor(
    private placementService: PlacementService
  ) {

  }

  private updateState(): void {
    this.activeCount = [this.dateFrom || this.dateTo, this.refNo, this.cedant].filter(Boolean).length;
    const tags: { key: string; label: string; value: string }[] = [];
    if (this.dateFrom) tags.push({ key: 'dateFrom', label: 'From:', value: this.dateFrom });
    if (this.dateTo) tags.push({ key: 'dateTo', label: 'To:', value: this.dateTo });
    if (this.refNo) tags.push({ key: 'refNo', label: 'Ref No:', value: this.refNo });
    if (this.cedant) tags.push({ key: 'cedant', label: 'Cedant:', value: this.cedant });
    if (this.type) tags.push({ key: 'type', label: 'Type:', value: this.type });
    if (this.status) tags.push({ key: 'status', label: 'Status:', value: this.status });
    this.activeTags = tags;
  }

  ngOnInit(): void {
    forkJoin([
      this.placementService.getPlacementTypes(),
      this.placementService.getPlacementStatuses(),
    ]).subscribe(resps => {
      this.typeOptions = resps[0].map(t => ({ label: t.name, value: t.id }));
      this.statusOptions = resps[1].map(t => ({ label: t.name, value: t.id }));
    });
  }

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  applyFilters(): void {
    this.emit();
  }

  removeTag(key: string): void {
    switch (key) {
      case 'dateFrom': this.dateFrom = ''; break;
      case 'dateTo': this.dateTo = ''; break;
      case 'refNo': this.refNo = ''; break;
      case 'cedant': this.cedant = ''; break;
      case 'type': this.type = ''; break;
      case 'status': this.status = ''; break;
    }
    this.emit();
  }

  clearAll(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.refNo = '';
    this.cedant = '';
    this.type = '';
    this.status = '';
    this.emit();
  }

  private emit(): void {
    this.updateState();
    this.filterChange.emit({
      dateFrom: this.dateFrom || null,
      dateTo: this.dateTo || null,
      refNo: this.refNo || null,
      cedant: this.cedant || null,
      type: this.type || null,
      status: this.status || null,
    });
  }
}
