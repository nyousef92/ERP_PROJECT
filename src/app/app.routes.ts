import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { UnauthenticatedGuard } from './core/guards/unauthenticated.gaurd';
import { AuthenticatedGuard } from './core/guards/authenticated.gaurd';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthenticatedGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/dashboard.routs')
                    .then(mod => mod.DASHBOARD_ROUTES)
            },
            {
                path: 'reinsurance',
                loadChildren: () => import('./features/reinsurance/reinsurance.routs')
                    .then(mod => mod.REINSURANCE_ROUTES)
            }
        ]
    }

];
