import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { PaginatorComponent } from '@shared/paginator/paginator.component';
import { CardsGridComponent } from '@shared/cards-grid/cards-grid.component';
import { HelperService } from '@core/services/helper.service';
import { ClaimsService } from '@core/services/claims.service';
import { ClaimsFilterComponent, ClaimsFilterState } from './claims-filter/claims-filter.component';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claims',
  imports: [NgClass, InputFieldComponent, PaginatorComponent, CardsGridComponent, ClaimsFilterComponent],
  templateUrl: './claims.component.html'
})
export class ClaimsComponent implements OnInit {

  searchText = '';
  metrics: any[] = [];
  claims: any[] = [];
  totalItems = 0;
  activeFilters: ClaimsFilterState = { status: null, cedant: null, dateFrom: null, dateTo: null };

  constructor(
    private helper: HelperService,
    private claimsService: ClaimsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.claimsService.getClaimsMetrics(),
      this.claimsService.getClaimsHistory({ pageSize: 6, currentPage: 1, searchText: '' })
    ]).subscribe(([metrics, history]) => {
      this.metrics = metrics;
      this.claims = history.data.map(item => {
        return ({ ...item, statusClasses: this.helper.getStatusClass(item.status) })
      });
      this.totalItems = history.totalItems;
    });
  }

  updateSearchValue(value: string) {
    this.searchText = value;
    this.getClaims();
  }

  onFilterChange(filters: ClaimsFilterState) {
    this.activeFilters = filters;
    this.getClaims();
  }

  getClaims(currentPage = 1) {
    this.claimsService.getClaimsHistory({
      pageSize: 6,
      currentPage,
      searchText: this.searchText,
      ...this.activeFilters
    }).subscribe(resp => {
      this.claims = resp.data.map(item => ({ ...item, statusClasses: this.helper.getStatusClass(item.status) }));
      this.totalItems = resp.totalItems;
    });
  }

  addNew() { }

  viewClaim(claimNo: string) {
    this.router.navigate(['/home/reinsurance/claims/preview', claimNo]);
  }

  editClaim(claimNo: string) { }
}
