import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Observable, of } from 'rxjs';
import { INotification } from '../intefaces/notification';
import { IconType } from '../intefaces/icon-config';


@Injectable({
  providedIn: 'root'
})
export class FacultativeService {

  constructor(
    private apiService: ApiService,
    private helper: HelperService
  ) { }


  getSubmissionTypes(): Observable<any[]> {
    //return this.apiService.get('')
    return of(
      [
        {
          facType: "Properotional",
          subType: [
            "Quota Share",
            "Surplus Fac"
          ]
        },
        {
          facType: "Non-Properotional",
          subType: [
            "Per Risk XoL",
            "Per Policy XoL"
          ]
        },
        {
          facType: "Facilities",
          subType: [
            "Semi-Automatic Fac",
            "Per Policy XoL"
          ]
        },
      ]);
  }

  saveFacultativeSubmission(arg0: { generalInfo: any; securityDetails: any; fiscalRegulatory: any; }) {
    //return this.apiService.post('',arg0)

    return of(true);
  }

}
