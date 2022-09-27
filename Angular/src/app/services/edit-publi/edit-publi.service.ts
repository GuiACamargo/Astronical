import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/models/Post';
import { Response } from 'src/models/Response';

@Injectable({
    providedIn: 'root',
})
export class EditPubliService {
    private apiUrl: string = 'http://localhost:3000/publicacao';

    constructor(private http: HttpClient) {}

    getPubli(id: number): Observable<Response<Post[]>> {
        return this.http.get<Response<Post[]>>(this.apiUrl + '/' + id);
    }

    editPubli(formData: FormData, id: number): Observable<Object> {
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
}
