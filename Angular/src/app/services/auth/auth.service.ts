import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/models/User';
import { UserToken } from 'src/models/UserToken';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrl: string = 'http://localhost:3000/login';
    private _isLoggedIn = new BehaviorSubject<boolean>(false);
    private _isLoggedOut = new BehaviorSubject<boolean>(true);
    private _AccountEmail = new BehaviorSubject<string>('');
    private _AccountRole = new BehaviorSubject<string>('');
    private _AccountId = new BehaviorSubject<number>(null);
    private readonly TOKEN_KEYNAME = 'auth_token';
    userToken!: UserToken;
    user!: User;
    role!: string;

    isLoggedIn = this._isLoggedIn.asObservable();
    isLoggedOut = this._isLoggedOut.asObservable();
    AccountEmail = this._AccountEmail.asObservable();
    AccountRole = this._AccountRole.asObservable();
    AccountId = this._AccountId.asObservable();

    constructor(
        private http: HttpClient,
        private jwt: JwtHelperService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        if (
            localStorage.getItem('auth_token') != null ||
            localStorage.getItem('auth_token') != undefined
        ) {
            if (this.jwt.isTokenExpired(this.token)) {
                this._isLoggedIn.next(false);
                this._isLoggedOut.next(true);
                this._AccountEmail.next('');
                this._AccountRole.next('');
                this._AccountId.next(null);
                this.snackBar.open(
                    'Token expired or missing, Sign in again please',
                    'Close',
                    {
                        duration: 4000,
                        panelClass: ['snackbar-error'],
                    }
                );
            } else {
                this._isLoggedIn.next(!!this.token);
                this._isLoggedOut.next(false);
                this.userToken = this.getUserToken(this.token);
                this._AccountEmail.next(this.userToken.email);
                this._AccountRole.next(this.userToken.cargo);
                this._AccountId.next(this.userToken.id);
            }
        }
    }

    get token() {
        return localStorage.getItem(this.TOKEN_KEYNAME);
    }

    logout(): void {
        this._isLoggedIn.next(false);
        this._isLoggedOut.next(true);
        this._AccountEmail.next('');
        this._AccountRole.next('');
        this._AccountId.next(null);
        localStorage.removeItem('auth_token');
        this.router.navigate(['/']);
        this.snackBar.open('Succesfully did the logout', 'Close', {
            duration: 4000,
            panelClass: ['snackbar-info'],
        });
    }

    login(formData: FormData): Observable<Object> {
        let object: any = {};
        formData.forEach((value, key) => {
            if (!Reflect.has(object, key)) {
                object[key] = value;
                return;
            }
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        });
        let json = JSON.stringify(object);

        return this.http
            .post(this.apiUrl, json, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .pipe(
                tap((response: any) => {
                    this._isLoggedIn.next(true);
                    this._isLoggedOut.next(false);
                    localStorage.setItem(this.TOKEN_KEYNAME, response.token);
                    this.userToken = this.getUserToken(response.token);
                    this._AccountEmail.next(this.userToken.email);
                    this._AccountRole.next(this.userToken.cargo);
                    this._AccountId.next(this.userToken.id);
                })
            );
    }

    isTokenValid(): boolean {
        return this.jwt.isTokenExpired(this.token) ? true : false;
    }

    private getUserToken(token: string): UserToken {
        return JSON.parse(window.atob(token.split('.')[1])) as UserToken;
    }
}
