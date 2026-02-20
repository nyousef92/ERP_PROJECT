import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cards-grid',
  standalone: true,
  templateUrl: './colored-cards-grid.component.html'
})
export class ColoredCardsGridComponent implements OnChanges {

  @Input() dataList: any[] = [];
  showIcons = false;

  ngOnChanges(): void {
    if (this.dataList.length > 0) {
      this.showIcons = this.dataList.every((item: any) => item.trendColorClass && item.iconColorClass && item.iconBgClass);
    }
  }
}
