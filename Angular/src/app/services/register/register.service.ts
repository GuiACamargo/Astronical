import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private apiUrl: string = 'http://localhost:3000/usuario';

    constructor(private http: HttpClient) {}

    createUser(formData: FormData): Observable<Object> {
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

        return this.http.post(this.apiUrl, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
