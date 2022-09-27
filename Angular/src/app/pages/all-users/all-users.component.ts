import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EraseUserDialogComponent } from 'src/app/erase-user-dialog/erase-user-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { AllUser } from 'src/models/AllUser';

@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
    allUsers: AllUser[];
    filteredUsers: AllUser[];
    hasUsers: boolean = true;
    numberOfPublis: number;
    numberOfPages: number;
    searchValue: string = '';
    accountId: number;
    _columns: string[] = ['id', 'name', 'email', 'role', 'actions'];

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private userService: UserService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getTheUsers();
    }

    getTheUsers(): void {
        this.userService.getAllUsers().subscribe((items) => {
            this.searchValue = '';
            const data = items.usuarios;
            this.allUsers = data;
            this.filteredUsers = data;
            this.numberOfPages = items.last_page;
            this.numberOfPublis = items.total;
            if (this.allUsers.length == 0) {
                this.hasUsers = false;
            }
        });
    }

    paginator(event: any): void {
        this.userService
            .getUsersWithPagination(event.pageIndex + 1)
            .subscribe((items) => {
                this.searchValue = '';
                const data = items.usuarios;
                this.allUsers = data;
                this.filteredUsers = data;
                this.numberOfPages = items.last_page;
                this.numberOfPublis = items.total;
            });
    }

    openDialog(email: string, id: number): void {
        let emailMessage: String = email;
        this.authService.AccountId.subscribe((item) => {
            this.accountId = item;
        });
        if (id == this.accountId) {
            emailMessage = `your own account (${email})`;
        }
        this.dialog
            .open(EraseUserDialogComponent, {
                data: {
                    email: emailMessage,
                    id: id,
                },
            })
            .afterClosed()
            .subscribe(() => {
                let isLoggedIn: boolean;
                this.authService.isLoggedIn.subscribe((item) => {
                    isLoggedIn = item;
                });
                if (isLoggedIn) {
                    this.getTheUsers();
                }
            });
    }

    search(event: any): void {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        this.filteredUsers = this.allUsers.filter((user) => {
            return user.nome.toLowerCase().includes(value);
        });

        if (this.filteredUsers.length == 0) {
            this.snackBar.open('No user to match the search', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-error'],
            });
        } else {
            this.snackBar.dismiss();
        }
    }
}
