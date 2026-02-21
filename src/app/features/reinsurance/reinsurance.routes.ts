import { Routes } from '@angular/router';

export const REINSURANCE_ROUTES: Routes = [
    { path: '', redirectTo: 'facultative', pathMatch: 'full' },
    {
        path: 'facultative',
        loadChildren: () => import('./facultative/facultative.routes')
            .then(mod => mod.FACULTAIVE_ROUTES)
    },
    {
        path: 'treaty',
        loadChildren: () => import('./treaty/treaty-container.routes')
            .then(mod => mod.TREATY_ROUTES)
    }
];
