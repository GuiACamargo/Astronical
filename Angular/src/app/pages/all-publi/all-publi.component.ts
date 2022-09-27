import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { AllPubliService } from 'src/app/services/all-publi/all-publi.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AllPost } from 'src/models/AllPost';

@Component({
    selector: 'app-all-publi',
    templateUrl: './all-publi.component.html',
    styleUrls: ['./all-publi.component.css'],
})
export class AllPubliComponent implements OnInit {
    allPublis: AllPost[];
    filteredPublis: AllPost[];
    hasPublis: boolean = true;
    UserEmail: string = '';
    UserRole: string = '';
    numberOfPublis: number;
    numberOfPages: number;
    searchValue: string = '';

    constructor(
        private allPubliService: AllPubliService,
        private snackBar: MatSnackBar,
        private router: Router,
        private dialog: MatDialog,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getThePublications();
    }

    getThePublications(): void {
        this.allPubliService.getPublis().subscribe((items) => {
            this.searchValue = '';
            const data = items.publicacoes;
            this.allPublis = data;
            this.filteredPublis = data;
            this.numberOfPages = items.last_page;
            this.numberOfPublis = items.total;
            if (this.allPublis.length == 0) {
                this.hasPublis = false;
            }
        });
    }

    paginator(event: any): void {
        this.allPubliService
            .getPublisWithPagination(event.pageIndex + 1)
            .subscribe((items) => {
                this.searchValue = '';
                const data = items.publicacoes;
                this.allPublis = data;
                this.filteredPublis = data;
                this.numberOfPages = items.last_page;
                this.numberOfPublis = items.total;
            });
    }

    like(publi: AllPost): void {
        const formData = new FormData();

        formData.append('titulo', publi.titulo);
        formData.append('descricao', publi.descricao);
        formData.append('pontuacao', (publi.pontuacao + 1).toString());

        this.allPubliService.updateLike(formData, publi.id).subscribe(() => {
            this.getThePublications();
            this.snackBar.open('Succesfully liked the post', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-info'],
            });
        });
    }

    sameUser(publi: AllPost): boolean {
        this.authService.AccountEmail.subscribe((item) => {
            this.UserEmail = item;
        });
        return this.UserEmail == publi.usuario.email ? true : false;
    }

    admin(publi: AllPost): boolean {
        this.authService.AccountEmail.subscribe((item) => {
            this.UserEmail = item;
        });
        this.authService.AccountRole.subscribe((item) => {
            this.UserRole = item;
        });

        if (this.UserEmail != publi.usuario.email && this.UserRole == 'admin') {
            return true;
        }
        return false;
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
                this.getThePublications();
            });
    }

    delete(id: number): void {
        this.allPubliService.deletePubli(id).subscribe(() => {
            this.snackBar.open('Succesfully deleted the post', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-info'],
            });
            this.getThePublications();
        });
    }

    edit(id: number): void {
        this.router.navigate([`/post/edit/${id}`]);
    }

    search(event: any): void {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        this.filteredPublis = this.allPublis.filter((publi) => {
            return publi.titulo.toLowerCase().includes(value);
        });

        if (this.filteredPublis.length == 0) {
            this.snackBar.open('No post to match the search', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-error'],
            });
        } else {
            this.snackBar.dismiss();
        }
    }
}
