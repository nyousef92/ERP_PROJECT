import { Routes } from '@angular/router';
import { ContractsComponent } from './contracts/contracts.component';
import { ClaimsComponent } from './claims/claims.component';
import { PreviewClaimComponent } from './claims/preview-claim/preview-claim.component';
import { ContactsComponent } from './contacts/contacts.component';

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
    },
    {
        path: 'contracts',
        component: ContractsComponent
    },
    {
        path: 'claims',
        children: [
            { path: '', component: ClaimsComponent },
            { path: 'preview/:claimNo', component: PreviewClaimComponent }
        ]
    }
    ,{
        path:'contacts',
        component:ContactsComponent
    }
];
