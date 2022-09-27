import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { EraseUserDialogComponent } from 'src/app/erase-user-dialog/erase-user-dialog.component';
import { AllPubliService } from 'src/app/services/all-publi/all-publi.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { AllPost } from 'src/models/AllPost';
import { User } from 'src/models/User';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    user!: User;
    wantToChange: boolean = false;
    updateForm!: FormGroup;
    hide = true;
    userName: string;
    userEmail: string;
    userCPF: string;
    userId: number;
    userPublis: AllPost[];
    hasPublis: boolean = true;

    constructor(
        private snackBar: MatSnackBar,
        private url: ActivatedRoute,
        private userService: UserService,
        private authService: AuthService,
        private allPubliService: AllPubliService,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const email = this.url.snapshot.paramMap.get('email');
        this.userService.getUserByEmail(email).subscribe((item) => {
            this.user = item;
            this.userName = item.nome;
            this.userCPF = item.cpf;
            this.userEmail = item.email;
            this.userId = item.id;
            this.getUserPublis(item.id);
        });
        this.updateForm = new FormGroup({
            name: new FormControl(''),
            email: new FormControl('', Validators.email),
            cpf: new FormControl(''),
            password: new FormControl('', Validators.required),
        });
    }

    getUserPublis(id: number) {
        this.allPubliService.getUserPublis(id).subscribe((items) => {
            this.userPublis = items.publicacoes;
            if (this.userPublis.length == 0) {
                this.hasPublis = false;
            }
        });
    }

    get password() {
        return this.updateForm.get('password')!;
    }

    get email() {
        return this.updateForm.get('email')!;
    }

    openDialog(title: string, id: number): void {
        this.dialog
            .open(DeleteDialogComponent, {
                data: {
                    title: title,
                    id: id,
                },
            })
            .afterClosed()
            .subscribe(() => {
                this.getUserPublis(this.userId);
            });
    }

    edit(id: number): void {
        this.router.navigate([`/post/edit/${id}`]);
    }

    change() {
        this.wantToChange = true;
    }

    logout(): void {
        this.authService.logout();
        this.snackBar.open('Sign-in again, please', 'Close', {
            duration: 4000,
            panelClass: ['snackbar-info'],
        });
    }

    delete() {
        this.dialog.open(EraseUserDialogComponent, {
            data: {
                email: `yourself (${this.userEmail})`,
                id: this.userId,
            },
        });
    }

    onSubmit() {
        if (this.updateForm.invalid) {
            this.snackBar.open(
                'Could not update, check the informations!',
                'Close',
                {
                    duration: 4000,
                    panelClass: ['snackbar-error'],
                }
            );
            return;
        }

        if (this.updateForm.get('cpf')!.value) {
            if (!cpf.isValid(this.updateForm.get('cpf')!.value)) {
                this.snackBar.open('Invalid CPF numbers', 'Close', {
                    duration: 4000,
                    panelClass: ['snackbar'],
                });
                return;
            }
        }

        const formData = new FormData();
        const email = this.url.snapshot.paramMap.get('email');
        this.userService.getUserByEmail(email).subscribe((item) => {
            let oldUser: User = item;
            formData.append(
                'nome',
                this.updateForm.get('name')!.value
                    ? this.updateForm.get('name')!.value
                    : oldUser.nome
            );
            formData.append(
                'email',
                this.updateForm.get('email')!.value
                    ? this.updateForm.get('email')!.value
                    : oldUser.email
            );
            formData.append(
                'cpf',
                this.updateForm.get('cpf')!.value
                    ? this.updateForm.get('cpf')!.value
                    : oldUser.cpf
            );
            formData.append('senha', this.updateForm.get('password')!.value);
            formData.append('cargo', oldUser.cargo);
            this.userService.updateUser(formData, oldUser.id).subscribe(() => {
                this.logout();
            });
        });
    }
}
