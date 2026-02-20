import { Routes } from '@angular/router';
import { SubmissionComponent } from './submission/submission.component';
import { FacultativeComponent } from './facultative.component';
import { FacultativeSubmissionComponent } from './submission/facultative-submission/facultative-submission.component';
import { ProgressSheetComponent } from './progress-sheet/progress-sheet.component';
import { PreviewFacultativeProgressSheetComponent } from './progress-sheet/preview-facultative-progress-sheet/preview-facultative-progress-sheet.component';
import { ViewFacultativeProgressSheetComponent } from './progress-sheet/view-facultative-progress-sheet/view-facultative-progress-sheet.component';

export const FACULTAIVE_ROUTES: Routes = [
    {
        path: '',
        component: FacultativeComponent,
        children: [
            { path: '', redirectTo: 'submission', pathMatch: 'full' },
            {
                path: 'submission',
                children: [
                    { path: '', component: SubmissionComponent },
                    {
                        path: 'add-facultative-submission',
                        component: FacultativeSubmissionComponent
                    },
                    {
                        path: 'add-facultative-submission/:refNumber',
                        component: FacultativeSubmissionComponent
                    },
                ]
            },
            {
                path: 'progress-sheet',
                children: [
                    { path: '', component: ProgressSheetComponent },
                    { path: 'preview-facultative-progress-sheet/:refNumber', component: PreviewFacultativeProgressSheetComponent },
                    { path: 'view-facultative-progress-sheet/:refNumber', component: ViewFacultativeProgressSheetComponent }
                ]
            }
        ]
    },


];
