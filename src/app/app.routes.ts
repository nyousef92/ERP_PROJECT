import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { UnauthenticatedGuard } from './core/guards/unauthenticated.guard';

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
                loadChildren: () => import('./features/dashboard/dashboard.routes')
                    .then(mod => mod.DASHBOARD_ROUTES)
            },
            {
                path: 'reinsurance',
                loadChildren: () => import('./features/reinsurance/reinsurance.routes')
                    .then(mod => mod.REINSURANCE_ROUTES)
            }
        ]
    }

];
