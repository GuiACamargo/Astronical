import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { RegisterService } from 'src/app/services/register/register.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    hide = true;
    registerForm!: FormGroup;

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private registerService: RegisterService
    ) {}

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            cpf: new FormControl('', [
                Validators.required,
                Validators.minLength(14),
            ]),
            password: new FormControl('', [Validators.required]),
        });
    }

    getErrorMessageEmail() {
        if (this.registerForm.get('email')!.hasError('required')) {
            return 'Email must have a value';
        }

        return this.registerForm.get('email')!.hasError('email')
            ? 'Invalid Email'
            : '';
    }

    getErrorMessageCpf() {
        if (this.registerForm.get('cpf')!.hasError('required')) {
            return 'CPF must have a value';
        }

        if (this.registerForm.get('cpf')!.hasError('validaCpf')) {
            return 'Invalid CPF number';
        }

        return this.registerForm.get('cpf')!.hasError('minlength')
            ? 'Invalid CPF size'
            : '';
    }

    get name() {
        return this.registerForm.get('name')!;
    }

    get email() {
        return this.registerForm.get('email')!;
    }

    get cpf() {
        return this.registerForm.get('cpf')!;
    }

    get password() {
        return this.registerForm.get('password')!;
    }

    onSubmit() {
        if (
            this.registerForm.invalid &&
            !cpf.isValid(this.registerForm.get('cpf')!.value)
        ) {
            this.snackBar.open(
                'Could not register, check the informations',
                'Close',
                {
                    duration: 4000,
                    panelClass: ['snackbar-error'],
                }
            );
            return;
        }
        if (!cpf.isValid(this.registerForm.get('cpf')!.value)) {
            this.snackBar.open('Invalid CPF numbers', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-error'],
            });
            return;
        }
        if (this.registerForm.invalid) {
            this.snackBar.open(
                'Could not register, check the informations',
                'Close',
                {
                    duration: 4000,
                    panelClass: ['snackbar-error'],
                }
            );
            return;
        }

        const formData = new FormData();

        formData.append('nome', this.registerForm.get('name')!.value);
        formData.append('email', this.registerForm.get('email')!.value);
        formData.append('cpf', this.registerForm.get('cpf')!.value);
        formData.append('senha', this.registerForm.get('password')!.value);
        formData.append('cargo', 'usuario');

        this.registerService.createUser(formData).subscribe(() => {
            this.router.navigate(['/sign-in']);
            this.snackBar.open('Succesfully Registered', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-info'],
            });
        });
    }
}
