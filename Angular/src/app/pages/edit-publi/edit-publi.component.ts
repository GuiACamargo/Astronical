import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPubliService } from 'src/app/services/edit-publi/edit-publi.service';
import { Post } from 'src/models/Post';

@Component({
    selector: 'app-edit-publi',
    templateUrl: './edit-publi.component.html',
    styleUrls: ['./edit-publi.component.css'],
})
export class EditPubliComponent implements OnInit {
    postTitle: string = '';
    buttonText: string = 'Edit';
    titleLabel: string = 'Edit your Post title';
    descriptionLabel: string = 'Edit your Post description';
    firstTime: boolean = true;
    post!: Post;

    constructor(
        private editPubliService: EditPubliService,
        private snackBar: MatSnackBar,
        private router: Router,
        private url: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = Number(this.url.snapshot.paramMap.get('id'));
        this.editPubliService.getPubli(id).subscribe((item) => {
            this.post = item.publicacoes[0];
            this.postTitle = this.post.titulo;
        });
    }

    async editPost(post: any) {
        const formData = new FormData();
        const id = Number(this.url.snapshot.paramMap.get('id'));

        formData.append('titulo', post.title);
        formData.append('descricao', post.description);
        formData.append(
            'pontuacao',
            post.pontuacao ? post.pontuacao.toString() : ''
        );

        if (this.firstTime) {
            this.editPubliService.editPubli(formData, id).subscribe(() => {
                this.router.navigate(['/post/all']);
                this.snackBar.open('Succesfully Published', 'Close', {
                    duration: 4000,
                    panelClass: ['snackbar-info'],
                });
            });
            this.firstTime = false;
        }
    }
}
