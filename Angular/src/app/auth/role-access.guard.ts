import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class RoleAccessGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authService.userToken.cargo == route.data['role']) {
            return true;
        } else {
            this.router.navigate(['/']);
            this.snackBar.open(
                'You do not have access to that area!',
                'Close',
                {
                    duration: 4000,
                    panelClass: ['snackbar-error'],
                }
            );
            return false;
        }
    }
}
