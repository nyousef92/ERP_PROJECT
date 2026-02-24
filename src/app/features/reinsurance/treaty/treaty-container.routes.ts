import { Routes } from '@angular/router';
import { TreatyContainerComponent } from './treaty-container.component';
import { TreatyComponent } from './treaty/treaty.component';
import { PreviewTreatyDetailsComponent } from './preview-treaty-details/preview-treaty-details.component';
import { TreatyClaimsComponent } from './treaty/treaty-claims/treaty-claims.component';
import { TreatyApprovalComponent } from './treaty/Approval/treaty-approval.component';
export const TREATY_ROUTES: Routes = [
    {
        path: '',
        component: TreatyContainerComponent,
        children: [
            { path: '', redirectTo: 'treaty', pathMatch: 'full' },
            {
                path: 'treaty',
                children: [
                    { path: '', component: TreatyComponent },
                    { path: 'preview-treaty-details/:refNumber', component: PreviewTreatyDetailsComponent },
                ]
            },
            {
                path: 'claims',
                children: [
                    { path: '', component: TreatyClaimsComponent },
                ]
            },
            {
                path: 'approval',
                children: [
                    { path: '', component: TreatyApprovalComponent },
                ]
            },
        ]
    },
];
