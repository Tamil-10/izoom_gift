import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';

import { User } from '../model/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User):Observable<HttpEvent<{}>> {
        alert(user.username);
       
        let formData = new FormData();
        formData.append('username', user.username);
        formData.append('firstname', user.firstName);
        formData.append('lastname', user.lastName);
        formData.append('password', '' + user.password);

        const req = new HttpRequest('POST', '/api/user/createUser', formData , {
            reportProgress: true,
            responseType: 'text'
        });
       return this.http.request(req);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}