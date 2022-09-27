import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPost } from 'src/models/AllPost';
import { Response } from 'src/models/Response';

@Injectable({
    providedIn: 'root',
})
export class AllPubliService {
    private apiUrl = 'http://localhost:3000/publicacao';

    constructor(private http: HttpClient) {}

    getPublis(): Observable<Response<AllPost[]>> {
        return this.http.get<Response<AllPost[]>>(this.apiUrl);
    }

    getPublisWithPagination(page: number): Observable<Response<AllPost[]>> {
        return this.http.get<Response<AllPost[]>>(
            this.apiUrl + '?page=' + page
        );
    }

    updateLike(formData: FormData, id: number): Observable<Object> {
        let object: any = {};
        formData.forEach((value, key) => {
            if (!Reflect.has(object, key)) {
                object[key] = value;
                return;
            }
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        });
        let json = JSON.stringify(object);
        return this.http.put(this.apiUrl + '/' + id, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getUserPublis(id: number): Observable<Response<AllPost[]>> {
        return this.http.get<Response<AllPost[]>>(
            this.apiUrl + '/usuario/' + id
        );
    }

    deletePubli(id: number): Observable<Object> {
        return this.http.delete(this.apiUrl + '/' + id, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
