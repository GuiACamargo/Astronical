import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        request = request.clone({
            headers: request.headers.set(
                'authorization',
                `Bearer ${this.authService.token}`
            ),
        });
        return next.handle(request).pipe(
            retry(1),

            catchError((error: HttpErrorResponse) => {
                // if (this.authService.isTokenValid() == false) {
                //     this.router.navigate(['/']);
                //     this.authService.logout();
                //     this.snackBar.open(
                //         'Token expired, please sign-in again',
                //         'Close',
                //         {
                //             duration: 4000,
                //             panelClass: ['snackbar-error'],
                //         }
                //     );
                // }
                return throwError(() => {
                    this.snackBar.open(error.error.message, 'Close', {
                        duration: 4000,
                        panelClass: ['snackbar-error'],
                    });
                });
            })
        );
    }
}

export const InterceptorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true,
};
