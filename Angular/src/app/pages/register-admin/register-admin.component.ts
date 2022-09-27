import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
    selector: 'app-register-admin',
    templateUrl: './register-admin.component.html',
    styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent implements OnInit {
    hide = true;
    registerAdminForm!: FormGroup;

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private registerService: RegisterService
    ) {}

    ngOnInit(): void {
        this.registerAdminForm = new FormGroup({
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
        if (this.registerAdminForm.get('email')!.hasError('required')) {
            return 'Email must have a value';
        }

        return this.registerAdminForm.get('email')!.hasError('email')
            ? 'Invalid Email'
            : '';
    }

    getErrorMessageCpf() {
        if (this.registerAdminForm.get('cpf')!.hasError('required')) {
            return 'CPF must have a value';
        }

        if (this.registerAdminForm.get('cpf')!.hasError('validaCpf')) {
            return 'Invalid CPF number';
        }

        return this.registerAdminForm.get('cpf')!.hasError('minlength')
            ? 'Invalid CPF size'
            : '';
    }

    get name() {
        return this.registerAdminForm.get('name')!;
    }

    get email() {
        return this.registerAdminForm.get('email')!;
    }

    get cpf() {
        return this.registerAdminForm.get('cpf')!;
    }

    get password() {
        return this.registerAdminForm.get('password')!;
    }

    onSubmit() {
        if (
            this.registerAdminForm.invalid &&
            !cpf.isValid(this.registerAdminForm.get('cpf')!.value)
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
        if (!cpf.isValid(this.registerAdminForm.get('cpf')!.value)) {
            this.snackBar.open('Invalid CPF numbers', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-error'],
            });
            return;
        }
        if (this.registerAdminForm.invalid) {
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

        formData.append('nome', this.registerAdminForm.get('name')!.value);
        formData.append('email', this.registerAdminForm.get('email')!.value);
        formData.append('cpf', this.registerAdminForm.get('cpf')!.value);
        formData.append('senha', this.registerAdminForm.get('password')!.value);
        formData.append('cargo', 'admin');

        this.registerService.createUser(formData).subscribe(() => {
            this.router.navigate(['/sign-in']);
            this.snackBar.open('Succesfully Registered', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-info'],
            });
        });
    }
}
