import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cards-grid',
  standalone: true,
  templateUrl: './cards-grid.component.html'
})
export class CardsGridComponent implements OnChanges {

  @Input() dataList: any[] = [];
  showIcons = false;

  ngOnChanges(): void {
    if (this.dataList.length > 0) {
      this.showIcons = this.dataList.every((item: any) => item.icon?.name && item.icon?.bgClass && item.icon?.colorClass);
    }
  }
}
