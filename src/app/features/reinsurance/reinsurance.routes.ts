import { Routes } from '@angular/router';

export const REINSURANCE_ROUTES: Routes = [
    { path: '', redirectTo: 'facultative', pathMatch: 'full' },
    {
        path: 'facultative',
        loadChildren: () => import('./facultative/facultative.routes')
            .then(mod => mod.FACULTAIVE_ROUTES)
    },
    {
        path: 'life',
        loadChildren: () => import('./life/life.routes')
            .then(mod => mod.LIFE_ROUTES)
    }
];
