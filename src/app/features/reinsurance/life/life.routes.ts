import { Routes } from "@angular/router";
import { LifeComponent } from "./life.component";
import { SubmissionComponent } from "./submission/submission.component";
import { AddNewLifeSubmissionComponent } from "./submission/add-new-life-submission/add-new-life-submission.component";

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
                    { path: 'add-life-submission', component: AddNewLifeSubmissionComponent }
                ]
            }
        ]
    }
]