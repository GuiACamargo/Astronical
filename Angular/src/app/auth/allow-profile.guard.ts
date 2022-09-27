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
export class AllowProfileGuard implements CanActivate {
    tokenEmail: string;

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        this.authService.AccountEmail.subscribe((item) => {
            this.tokenEmail = item;
        });

        const emailUser: string = route.paramMap.get('email');

        if (emailUser == this.tokenEmail) {
            return true;
        } else {
            this.router.navigate(['/']);
            this.snackBar.open(
                'You are not allowed to enter that Profile!',
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
