import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
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
        return this.authService.isLoggedIn.pipe(
            tap((isLoggedIn) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/sign-in']);
                    this.snackBar.open(
                        'Sign-in first before acessing that area!',
                        'Close',
                        {
                            duration: 4000,
                            panelClass: ['snackbar-error'],
                        }
                    );
                }
            })
        );
    }
}
