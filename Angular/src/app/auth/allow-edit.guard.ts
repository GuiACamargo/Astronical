import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from 'src/models/Post';
import { AuthService } from '../services/auth/auth.service';
import { EditPubliService } from '../services/edit-publi/edit-publi.service';

@Injectable({
    providedIn: 'root',
})
export class AllowEditGuard implements CanActivate {
    post!: Post;
    postEmail: string;
    tokenEmail: string;
    same: boolean;

    constructor(
        private editPubliService: EditPubliService,
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
        const id: number = Number(route.paramMap.get('id'));

        this.authService.AccountEmail.subscribe((item) => {
            this.tokenEmail = item;
        });

        return this.editPubliService.getPubli(id).pipe(
            map((item) => {
                this.post = item.publicacoes[0];
                this.postEmail = item.publicacoes[0].usuario.email;
                if (this.postEmail == this.tokenEmail) {
                    return true;
                } else {
                    this.router.navigate(['/post/all']);
                    this.snackBar.open(
                        'You are not allowed to edit that Post!',
                        'Close',
                        {
                            duration: 4000,
                            panelClass: ['snackbar-error'],
                        }
                    );
                    return false;
                }
            })
        );
    }
}
