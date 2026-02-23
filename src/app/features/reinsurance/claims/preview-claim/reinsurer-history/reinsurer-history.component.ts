import { Component, OnInit } from '@angular/core';
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: 'app-reinsurer-history',
  imports: [],
  templateUrl: './reinsurer-history.component.html'
})
export class ReinsurerHistoryComponent implements OnInit {

  reinsurer: any;
  close!: () => void;

  constructor(protected helper: HelperService) { }

  ngOnInit(): void {
    this.reinsurer = {
      ...this.reinsurer,
      history: this.reinsurer.history.map((item: any) => ({
        ...item,
        classes: this.helper.getStatusClass(item.status)
      }))
    };
  }
}
