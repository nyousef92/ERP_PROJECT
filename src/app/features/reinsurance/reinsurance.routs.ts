import { Routes } from '@angular/router';

export const REINSURANCE_ROUTES: Routes = [
    { path: '', redirectTo: 'facultative', pathMatch: 'full' },
    {
        path: 'facultative',
        loadChildren: () => import('./facultative/facultative.routs')
            .then(mod => mod.FACULTAIVE_ROUTES)
    }
];
