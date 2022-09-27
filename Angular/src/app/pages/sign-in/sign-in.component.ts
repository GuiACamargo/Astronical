import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
    hide = true;
    signInForm!: FormGroup;
    hello: string = '';

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.signInForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

    getErrorMessageEmail() {
        if (this.signInForm.get('email')!.hasError('required')) {
            return 'Email must have a value';
        }

        return this.signInForm.get('email')!.hasError('email')
            ? 'Invalid Email'
            : '';
    }

    get email() {
        return this.signInForm.get('email')!;
    }

    get password() {
        return this.signInForm.get('password')!;
    }

    onSubmit() {
        if (this.signInForm.invalid) {
            this.snackBar.open(
                'Could not Sign-in, check the informations',
                'Close',
                {
                    duration: 4000,
                    panelClass: ['snackbar-error'],
                }
            );
            return;
        }

        const formData = new FormData();

        formData.append('email', this.signInForm.get('email')!.value);
        formData.append('senha', this.signInForm.get('password')!.value);

        this.authService.login(formData).subscribe({
            next: () => {
                this.router.navigate(['/']);
                this.snackBar.open('Succesfully logged-in', 'Close', {
                    duration: 4000,
                    panelClass: ['snackbar-info'],
                });
            },
            error: () => {
                this.snackBar.open(
                    'Log-in failed, username or password incorrect',
                    'Close',
                    {
                        duration: 4000,
                        panelClass: ['snackbar-error'],
                    }
                );
            },
        });
    }
}
