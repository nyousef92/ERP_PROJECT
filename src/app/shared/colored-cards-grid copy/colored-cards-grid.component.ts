import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-colored-cards-grid',
  standalone: true,
  templateUrl: './colored-cards-grid.component.html',
  imports: []
})
export class ColoredCardsGridComponent {

  @Input() dataList: any[] = [];

}
