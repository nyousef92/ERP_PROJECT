import { Routes } from '@angular/router';
import { SubmissionComponent } from './submission/submission.component';
import { FacultativeComponent } from './facultative.component';

export const FACULTAIVE_ROUTES: Routes = [

    {
        path: '',
        component: FacultativeComponent,
        children: [
            { path: '', redirectTo: 'submission', pathMatch: 'full' },
            {
                path: 'submission',
                component: SubmissionComponent
            },]
    },


];
