import { Component, OnInit } from '@angular/core';
import { PlacementService } from '@core/services/placement.service';
import { ColoredCardsGridComponent } from "@shared/colored-cards-grid/colored-cards-grid.component";
import { PlacemenrFilterComponent, PlacementFilterState } from "./placemenr-filter/placemenr-filter.component";
import { NgClass } from '@angular/common';
import { PaginatorComponent } from "@shared/paginator/paginator.component";

@Component({
  selector: 'app-placement',
  imports: [ColoredCardsGridComponent, PlacemenrFilterComponent, NgClass, PaginatorComponent],
  templateUrl: './placement.component.html'
})
export class PlacementComponent implements OnInit {

  metrics: any[] = [];
  placements: any[] = [];
  totalItems: number = 0;
  filters: PlacementFilterState | undefined;
  constructor(
    private placementService: PlacementService
  ) { }

  ngOnInit(): void {
    this.placementService.getPlacementMetrics().subscribe((data) => {
      this.metrics = data;
    });

    this.placementService.getPlacementList({

    }).subscribe((data) => {
      this.placements = data.data;
      this.totalItems = data.totalItems;
    });
  }

  addNew() { }

  getStatusClass(status: string): string {
    status = status.trim().toLocaleLowerCase();
    switch (status) {
      case 'placed': return 'bg-green-100 text-green-700 border-green-200';
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  onPageChange(page: number) {
    let payLoad;
    if (this.filters) {
      payLoad = {
        pageNumber: page,
        pageSize: 6,
        ...this.filters
      }
    } else {
      payLoad = {
        pageNumber: page,
        pageSize: 6
      }
    }
    this.placementService.getPlacementList(payLoad).subscribe((data) => {
      this.placements = data.data;
      this.totalItems = data.totalItems;
    });
  }

  onFilterChange(filters: PlacementFilterState) {
    this.filters = filters;
    this.placementService.getPlacementList({
      ...filters,
      pageNumber: 1,
      pageSize: 6
    }).subscribe((data) => {
      this.placements = data.data;
      this.totalItems = data.totalItems;
    });

  }
}
