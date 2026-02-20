import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-colored-cards-grid',
    templateUrl: './colored-cards-grid.component.html',
    imports: []
})
export class ColoredCardsGridComponent {

  @Input() dataList: any[] = [];

}
