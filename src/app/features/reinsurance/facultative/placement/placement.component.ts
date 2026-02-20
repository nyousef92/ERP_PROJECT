import { Component, OnInit, ViewChild } from '@angular/core';
import { PlacementService } from '@core/services/placement.service';
import { ColoredCardsGridComponent } from "@shared/colored-cards-grid/colored-cards-grid.component";
import { PlacemenrFilterComponent, PlacementFilterState } from "./placemenr-filter/placemenr-filter.component";
import { NgClass } from '@angular/common';
import { PaginatorComponent } from "@shared/paginator/paginator.component";
import { ModalComponent } from '@shared/modal/modal.component';
import { AddNewPlacementComponent } from './add-new-placement/add-new-placement.component';
import { forkJoin } from 'rxjs';
import { DeleteItemComponent } from '@shared/delete-item/delete-item.component';

@Component({
  selector: 'app-placement',
  imports: [ColoredCardsGridComponent, PlacemenrFilterComponent, NgClass, PaginatorComponent, ModalComponent],
  templateUrl: './placement.component.html'
})
export class PlacementComponent implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent;

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

  addNew() {
    this.modal.open(AddNewPlacementComponent, {
      onSaved: (data: any) => {
        forkJoin(
          [
            this.placementService.addNewPlacement(data),
            this.placementService.getPlacementList({})
          ]
        ).subscribe(res => {
          this.placements = res[1].data;
          this.totalItems = res[1].totalItems;
        });
      }
    }, 'xl');
  }


  delete(refNo: string) {
      this.modal.open(DeleteItemComponent, {
          description: `Are you sure you want to delete placement with ref no ${refNo}?`,
          onDelete: () => {
            this.placementService.deletePlacement(refNo).subscribe(() => {
              this.placements = this.placements.filter(p => p.refNo !== refNo);
              this.totalItems--;
            }); 
          }
        }, 'sm');
    }

  editPlacement(refNom: string) {
    this.placementService.getPlacementDeatils(refNom).subscribe((data) => {
      this.modal.open(AddNewPlacementComponent, {
        placement: data,
        onSaved: (updated: any) => {
          forkJoin([
            this.placementService.updatePlacement(refNom, updated),
            this.placementService.getPlacementList({})
          ]).subscribe(res => {
            this.placements = res[1].data;
            this.totalItems = res[1].totalItems;
          });
        }
      }, 'xl');
    });
  }

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
