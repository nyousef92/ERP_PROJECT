import { Routes } from '@angular/router';
import { SubmissionComponent } from './submission/submission.component';
import { FacultativeComponent } from './facultative.component';
import { FacultativeSubmissionComponent } from './submission/facultative-submission/facultative-submission.component';
import { ProgressSheetComponent } from './progress-sheet/progress-sheet.component';
import { ViewFacultativeProgressSheetComponent } from './progress-sheet/view-facultative-progress-sheet/view-facultative-progress-sheet.component';
import { PlacementComponent } from './placement/placement.component';
import { ApprovalComponent } from './approval/approval.component';
import { PreviewProgressSheetComponent } from '../shared/preview-progress-sheet/preview-progress-sheet.component';

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
                    { path: 'preview/:refNumber/:sheetType', component: PreviewProgressSheetComponent },
                    { path: 'view-facultative-progress-sheet/:refNumber', component: ViewFacultativeProgressSheetComponent },
                ]
            },
            {
                path: 'placement',
                children: [
                    { path: '', component: PlacementComponent },
                ]
            },
            {
                path: 'approval',
                children: [
                    { path: '', component: ApprovalComponent },

                ]
            }
        ]
    },


];
