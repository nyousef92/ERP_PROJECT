import { Component, OnInit } from '@angular/core';
import { PlacementService } from '@core/services/placement.service';
import { ColoredCardsGridComponent } from "@shared/colored-cards-grid/colored-cards-grid.component";

@Component({
  selector: 'app-placement',
  imports: [ColoredCardsGridComponent],
  templateUrl: './placement.component.html'
})
export class PlacementComponent implements OnInit {
  metrics: any[] = [];
  constructor(
    private placementService: PlacementService
  ) { }

  ngOnInit(): void {
    this.placementService.getPlacementMetrics().subscribe((data) => {
      console.log(data);
      this.metrics = data;
    })
  }
  addNew() { }
}
