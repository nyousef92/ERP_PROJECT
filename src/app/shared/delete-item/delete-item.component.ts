import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-item',
  imports: [],
  templateUrl: './delete-item.component.html'
})
export class DeleteItemComponent {

  @Input() description: string = '';
  close!: () => void;
  onDelete?: (data: any) => void;

  onDelet() {
    this.onDelete?.(null);
    this.close();
  }

}
