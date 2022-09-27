import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllUser } from 'src/models/AllUser';
import { ResponseUser } from 'src/models/ResponseUser';
import { User } from 'src/models/User';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    apiUrl: string = 'http://localhost:3000/usuario';

    constructor(private http: HttpClient) {}

    getUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + '/' + email);
    }

    updateUser(formData: FormData, id: number): Observable<Object> {
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

    getAllUsers(): Observable<ResponseUser<AllUser[]>> {
        return this.http.get<ResponseUser<AllUser[]>>(this.apiUrl);
    }

    getUsersWithPagination(page: number): Observable<ResponseUser<AllUser[]>> {
        return this.http.get<ResponseUser<AllUser[]>>(
            this.apiUrl + '?page=' + page
        );
    }

    deleteUser(id: number): Observable<Object> {
        return this.http.delete(this.apiUrl + '/' + id, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
