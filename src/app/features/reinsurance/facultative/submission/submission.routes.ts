import { Routes } from "@angular/router";
import { SubmissionComponent } from "./submission.component";
import { FacultativeSubmissionComponent } from "./facultative-submission/facultative-submission.component";

export const FUBMISSION_ROUTES: Routes = [

    {
        path: '',
        component: SubmissionComponent,
        children: [
            { path: '', redirectTo: 'submission', pathMatch: 'full' },
            {
                path: 'add-facultative-submission',
                component: FacultativeSubmissionComponent
            }
        ]
    },


];
