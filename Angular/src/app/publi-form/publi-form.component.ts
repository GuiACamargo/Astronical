import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    Component,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Post } from 'src/models/Post';

@Component({
    selector: 'app-publi-form',
    templateUrl: './publi-form.component.html',
    styleUrls: ['./publi-form.component.css'],
})
export class PubliFormComponent implements OnInit {
    @Output() submit = new EventEmitter<Post>();
    @Input() buttonText!: string;
    @Input() titleLabel!: string;
    @Input() descriptionLabel!: string;
    @Input() postData: Post | null = null;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    fileName: string = '';

    postForm!: FormGroup;

    constructor(private snackBar: MatSnackBar, private _ngZone: NgZone) {}

    ngOnInit(): void {
        this.postForm = new FormGroup({
            postId: new FormControl(this.postData ? this.postData.id : ''),
            userId: new FormControl(
                this.postData ? this.postData.usuario.id : ''
            ),
            title: new FormControl(this.postData ? this.postData.titulo : '', [
                Validators.required,
            ]),
            description: new FormControl(
                this.postData ? this.postData.descricao : '',
                [Validators.required]
            ),
            pontuation: new FormControl(
                this.postData ? this.postData.pontuacao : '0'
            ),
        });
    }

    get title() {
        return this.postForm.get('title')!;
    }
    get description() {
        return this.postForm.get('description')!;
    }

    onSubmit(): void {
        if (this.postForm.invalid) {
            this.snackBar.open(
                'Could not Post, check the informations',
                'Close',
                {
                    duration: 4000,
                    panelClass: ['snackbar-error'],
                }
            );
            return;
        }

        this.submit.emit(this.postForm.value);
    }

    triggerResize() {
        this._ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }
}
