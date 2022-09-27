import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllPubliService } from '../services/all-publi/all-publi.service';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { title: string; id: number },
        private allPubliService: AllPubliService,
        private snackBar: MatSnackBar
    ) {}

    delete(id: number) {
        this.allPubliService.deletePubli(id).subscribe(() => {
            this.snackBar.open('Succesfully deleted the post', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-info'],
            });
        });
    }
}
