import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
    selector: 'app-erase-user-dialog',
    templateUrl: './erase-user-dialog.component.html',
    styleUrls: ['./erase-user-dialog.component.css'],
})
export class EraseUserDialogComponent {
    AccountId: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { email: string; id: number },
        private userService: UserService,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {}

    delete(id: number) {
        this.authService.AccountId.subscribe((item) => {
            this.AccountId = item;
        });
        this.userService.deleteUser(id).subscribe(() => {
            this.snackBar.open('Succesfully deleted the user', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-info'],
            });
            if (id == this.AccountId) {
                this.authService.logout();
            }
        });
    }
}
