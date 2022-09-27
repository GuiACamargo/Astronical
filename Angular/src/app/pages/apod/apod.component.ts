import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApodService } from 'src/app/services/apod.service';

@Component({
    selector: 'app-apod',
    templateUrl: './apod.component.html',
    styleUrls: ['./apod.component.css'],
})
export class ApodComponent implements OnInit {
    value: string = '';
    dateForm!: FormGroup;
    error: string = '';
    loading: boolean = false;

    present: boolean = false;

    datepipe: DatePipe = new DatePipe('en-US');

    copyright?: string;
    date?: string;
    explanation!: string;
    title?: string;
    hd_url?: string;
    url?: string;

    constructor(
        private apodService: ApodService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.dateForm = new FormGroup({
            date: new FormControl(''),
        });
    }

    onSubmit(): void {
        let date = this.datepipe.transform(
            this.dateForm.get('date')?.value,
            'YYYY-MM-dd'
        )!;
        this.loading = true;
        this.error = '';
        this.hd_url = null;
        this.url = null;
        this.apodService.getApodByDate(date).subscribe({
            next: (apod) => {
                this.copyright = apod.copyright;
                this.date = apod.date;
                this.explanation = apod.explanation;
                this.title = apod.title;
                this.hd_url = apod.hdurl;
                this.url = apod.url;
                this.present = true;
                this.loading = false;
            },
            error: () => {
                this.snackBar.dismiss();
                this.error =
                    "Error on searching this date! Choose one and check if its a past or today date! We can't predict the future";
                this.copyright = '';
                this.date = '';
                this.explanation = '';
                this.title = '';
                this.hd_url = '';
                this.url = '';
                this.present = false;
                this.loading = false;
            },
        });
    }

    picOfDay(): void {
        this.hd_url = null;
        this.url = null;
        this.loading = true;
        this.error = '';
        this.apodService.getApod().subscribe({
            next: (apod) => {
                this.copyright = apod.copyright;
                this.date = apod.date;
                this.explanation = apod.explanation;
                this.title = apod.title;
                this.hd_url = apod.hdurl;
                this.url = apod.url;
                this.present = true;
                this.loading = false;
            },
            error: () => {
                this.snackBar.dismiss();
                this.error =
                    'Error on searching the APOD! Please try again later or message one of the admins!';
                this.copyright = '';
                this.date = '';
                this.explanation = '';
                this.title = '';
                this.hd_url = '';
                this.url = '';
                this.present = false;
                this.loading = false;
            },
        });
    }
}
