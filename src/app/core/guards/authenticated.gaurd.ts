import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { SessionService } from "../services/session.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
    constructor(
        private session: SessionService,
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const isLoggedIn = !!this.session.isLoggedIn()
        if (!isLoggedIn) {

            this.router.navigate(['']);
        }
        return isLoggedIn;
    }

}