import { Component, EventEmitter, OnInit, Output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { SelectDropdownComponent } from '@shared/select-dropdown/select-dropdown.component';
import { ClaimsService } from '@core/services/claims.service';
import { forkJoin } from 'rxjs';

export interface TreatyClaimsFilterState {
    status: string | null;
    company: string | null;
    dateFrom: string | null;
    dateTo: string | null;
}

@Component({
    selector: 'app-treaty-claims-filter',
    imports: [FormsModule, InputFieldComponent, SelectDropdownComponent],
    templateUrl: './treaty-claims-filter.component.html'
})
export class TreatyClaimsFilterComponent implements OnInit {

    showFilters = model<boolean>(false);

    status = '';
    company = '';
    dateFrom = '';
    dateTo = '';

    @Output() filterChange = new EventEmitter<TreatyClaimsFilterState>();

    activeCount = 0;
    activeTags: { key: string; label: string; value: string }[] = [];
    statusOptions: any[] = [];
    companyOptions: any[] = [];

    constructor(private claimsService: ClaimsService) { }

    ngOnInit(): void {
        forkJoin([
            this.claimsService.getClaimsStatuses(),
            this.claimsService.getClaimsCedants(),
        ]).subscribe(([statuses, cedants]) => {
            this.statusOptions = statuses;
            this.companyOptions = cedants;
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
            case 'status': this.status = ''; break;
            case 'company': this.company = ''; break;
            case 'dateFrom': this.dateFrom = ''; break;
            case 'dateTo': this.dateTo = ''; break;
        }
        this.emit();
    }

    clearAll(): void {
        this.status = '';
        this.company = '';
        this.dateFrom = '';
        this.dateTo = '';
        this.emit();
    }

    private updateState(): void {
        this.activeCount = [this.status, this.company, this.dateFrom, this.dateTo].filter(Boolean).length;
        const tags: { key: string; label: string; value: string }[] = [];
        if (this.status) tags.push({ key: 'status', label: 'Status:', value: this.status });
        if (this.company) tags.push({ key: 'company', label: 'Company:', value: this.company });
        if (this.dateFrom) tags.push({ key: 'dateFrom', label: 'From:', value: this.dateFrom });
        if (this.dateTo) tags.push({ key: 'dateTo', label: 'To:', value: this.dateTo });
        this.activeTags = tags;
    }

    private emit(): void {
        this.updateState();
        this.filterChange.emit({
            status: this.status || null,
            company: this.company || null,
            dateFrom: this.dateFrom || null,
            dateTo: this.dateTo || null,
        });
    }
}
