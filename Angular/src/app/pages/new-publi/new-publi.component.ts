import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewPubliService } from 'src/app/services/new-publi/new-publi.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/models/User';

@Component({
    selector: 'app-new-publi',
    templateUrl: './new-publi.component.html',
    styleUrls: ['./new-publi.component.css'],
})
export class NewPubliComponent implements OnInit {
    buttonText = 'publish';
    titleLabel = 'The title of your new Post';
    descriptionLabel = 'Description of your new Post';
    firstTime: boolean = true;

    constructor(
        private newPubliService: NewPubliService,
        private snackBar: MatSnackBar,
        private router: Router,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {}

    async createPost(post: any) {
        let email: string;
        let id: number;
        this.authService.AccountEmail.subscribe((item) => {
            email = item;
        });
        this.userService.getUserByEmail(email).subscribe((user: User) => {
            id = user.id;
            const formData = new FormData();

            formData.append('titulo', post.title);
            formData.append('descricao', post.description);
            formData.append('pontuacao', '0');
            formData.append('usuarioId', id.toString());

            if (this.firstTime) {
                this.newPubliService.createPubli(formData).subscribe(() => {
                    this.router.navigate(['/post/all']);
                    this.snackBar.open('Succesfully Published', 'Close', {
                        duration: 4000,
                        panelClass: ['snackbar-info'],
                    });
                });
                this.firstTime = false;
            }
        });
    }
}
