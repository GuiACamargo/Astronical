import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apod } from 'src/models/Apod';

@Injectable({
    providedIn: 'root',
})
export class ApodService {
    private ApiUrl: string =
        'https://api.nasa.gov/planetary/apod?api_key=Shhyh2hzYSoKVK4GMFEK5RpyY9hlk6ZfEvOh1DWN';

    constructor(private http: HttpClient) {}

    getApod(): Observable<Apod> {
        return this.http.get<Apod>(this.ApiUrl);
    }

    getApodByDate(date: string): Observable<Apod> {
        return this.http.get<Apod>(`${this.ApiUrl}&date=${date}`);
    }
}
