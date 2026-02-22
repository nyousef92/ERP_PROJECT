import { Routes } from "@angular/router";
import { LifeComponent } from "./life.component";
import { SubmissionComponent } from "./submission/submission.component";
import { AddLifeSubmissionComponent } from "./submission/add-life-submission/add-life-submission.component";
import { ProgressSheetComponent } from "./progress-sheet/progress-sheet.component";
import { PreviewProgressSheetComponent } from "../shared/preview-progress-sheet/preview-progress-sheet.component";
import { ViewLifeProgressSheetComponent } from "./progress-sheet/view-life-progress-sheet/view-life-progress-sheet.component";
import { PlacementComponent } from "./placement/placement.component";

export const LIFE_ROUTES: Routes = [
    {
        path: '',
        component: LifeComponent,
        children: [
            { path: '', redirectTo: 'submission', pathMatch: 'full' },
            {
                path: 'submission',
                children: [
                    { path: '', component: SubmissionComponent },
                    { path: 'add-life-submission', component: AddLifeSubmissionComponent },
                    { path: 'add-life-submission/:refNumber', component: AddLifeSubmissionComponent },
                ]
            },
            {
                path: 'progress-sheet',
                children: [
                    { path: '', component: ProgressSheetComponent },
                    { path: 'preview/:refNumber/:sheetType', component: PreviewProgressSheetComponent },
                    { path: 'view-life-progress-sheet/:refNumber', component: ViewLifeProgressSheetComponent },
                ]
            },
            {
                path: 'placement',
                children: [
                    { path: '', component: PlacementComponent },
                ]
            }
        ]
    }
]