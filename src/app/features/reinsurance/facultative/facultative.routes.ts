import { Routes } from '@angular/router';
import { SubmissionComponent } from './submission/submission.component';
import { FacultativeComponent } from './facultative.component';
import { FacultativeSubmissionComponent } from './submission/facultative-submission/facultative-submission.component';

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
                ]
            },
        ]
    },


];
