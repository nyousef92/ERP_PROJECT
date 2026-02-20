import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { UnauthenticatedGuard } from './core/guards/unauthenticated.gaurd';
import { AuthenticatedGuard } from './core/guards/authenticated.gaurd';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate:[UnauthenticatedGuard]
    },

    {
        path: 'home',
        component: HomeComponent,
        canActivate:[AuthenticatedGuard]
    }

];
