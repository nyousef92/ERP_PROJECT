import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnChanges {
  @Input() listName = '';
  @Input() currentPage = 1;
  @Input() totalItems = 1;
  startingIndex = 0;
  endingingIndex = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }


}
