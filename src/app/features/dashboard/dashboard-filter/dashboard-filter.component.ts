import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  model
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { SharedService } from '@core/services/shared.service';
import { InputFieldComponent } from "@shared/input-field/input-field.component";

export interface FilterState {
  dateFrom: string | null;
  dateTo: string | null;
  activityType: string;
  module: string;
}


@Component({
  selector: 'app-dashboard-filter',
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './dashboard-filter.component.html'
})
export class DshboardFilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<FilterState>();

  dateFrom: string = '';
  dateTo: string = '';
  activityType: string = 'All';
  module: string = 'All';
  activeQuick: string | null = null;

  activityTypes: string[] = [];
  modules: string[] = [];

  quickRanges = [
    { label: 'Today', value: 'Today' },
    { label: 'Last 7 Days', value: 'Last 7 Days' },
    { label: 'Last Week', value: 'Last Week' },
    { label: 'Last Month', value: 'Last Month' },
    { label: 'Last Quarter', value: 'Last Quarter' },
  ];

  activeCount: number = 0;

  private updateCount(): void {
    this.activeCount = [
      this.dateFrom || this.dateTo,
      this.activityType !== 'All',
      this.module !== 'All',
    ].filter(Boolean).length;
  }

  activeTags: { key: string; label: string; value: string }[] = [];

  private updateTags(): void {
    const tags: { key: string; label: string; value: string }[] = [];
    if (this.dateFrom) tags.push({ key: 'dateFrom', label: 'From:', value: this.dateFrom });
    if (this.dateTo) tags.push({ key: 'dateTo', label: 'To:', value: this.dateTo });
    if (this.activityType !== 'All') tags.push({ key: 'activityType', label: 'Type:', value: this.activityType });
    if (this.module !== 'All') tags.push({ key: 'module', label: 'Module:', value: this.module });
    this.activeTags = tags;
  }

  showFilters = model<boolean>(false);


  constructor(
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.getOptionsData();
  }

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  getOptionsData() {
    forkJoin({
      activityTypes: this.shared.getActivityTypes(),
      moduleTypes: this.shared.getModuleTypes(),
    }).subscribe(resp => {
      this.activityTypes = resp.activityTypes;
      this.modules = resp.moduleTypes;
    });
  }

  applyQuickRange(label: string): void {
    const { from, to } = this.resolveRange(label);
    this.dateFrom = from;
    this.dateTo = to;
    this.activeQuick = label;
    this.emit();
  }

  private resolveRange(label: string): { from: string; to: string } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (label) {
      case 'Today':
        return { from: this.toISO(today), to: this.toISO(today) };

      case 'Last 7 Days': {
        const from = new Date(today);
        from.setDate(today.getDate() - 6);
        return { from: this.toISO(from), to: this.toISO(today) };
      }

      case 'Last Week': {
        const dayOfWeek = today.getDay();
        const distToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const thisMonday = new Date(today);
        thisMonday.setDate(today.getDate() - distToLastMonday);
        const lastMonday = new Date(thisMonday);
        lastMonday.setDate(thisMonday.getDate() - 7);
        const lastSunday = new Date(lastMonday);
        lastSunday.setDate(lastMonday.getDate() + 6);
        return { from: this.toISO(lastMonday), to: this.toISO(lastSunday) };
      }

      case 'Last Month': {
        const from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const to = new Date(today.getFullYear(), today.getMonth(), 0);
        return { from: this.toISO(from), to: this.toISO(to) };
      }

      case 'Last Quarter': {
        const q = Math.floor(today.getMonth() / 3);
        const from = new Date(today.getFullYear(), (q - 1) * 3, 1);
        const to = new Date(today.getFullYear(), q * 3, 0);
        return { from: this.toISO(from), to: this.toISO(to) };
      }

      default:
        return { from: '', to: '' };
    }
  }

  onDateFromChange(): void {
    this.activeQuick = null;
  }

  onDateToChange(): void {
    this.activeQuick = null;
  }

  applyFilters(): void {
    this.emit();
  }

  removeTag(key: string): void {
    switch (key) {
      case 'dateFrom': this.dateFrom = ''; this.activeQuick = null; break;
      case 'dateTo': this.dateTo = ''; this.activeQuick = null; break;
      case 'activityType': this.activityType = 'All'; break;
      case 'module': this.module = 'All'; break;
    }
    this.emit();
  }

  clearAll(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.activityType = 'All';
    this.module = 'All';
    this.activeQuick = null;
    this.emit();
  }

  private emit(): void {
    this.filterChange.emit({
      dateFrom: this.dateFrom || null,
      dateTo: this.dateTo || null,
      activityType: this.activityType,
      module: this.module,
    });
    this.updateTags();
    this.updateCount();
  }

  private toISO(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${mm}-${dd}`;
  }
}
