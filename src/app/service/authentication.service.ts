import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    // login(username: string, password: string) {
    //     return this.http.post<any>('/api/authenticate', { username: username, password: password })
    //         .map(user => {
    //             // login successful if there's a jwt token in the response
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }

    //             return user;
    //         });
    // }
    login(username: string, password: string) {

        let formData = new FormData();
        formData.append('username', username);
         formData.append('password', '' + password);

        const req = new HttpRequest('POST', '/api/user/checkLogin', formData , {
            reportProgress: true,
            responseType: 'text'
        });

     
alert("authenticate function")

       return this.http.request(req);
      // return "success";

    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}