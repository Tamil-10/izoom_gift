import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';

import { User } from '../model/user';
import { Videos } from '../model/videos';

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
        //alert("user service page "+user.username);

        let formData = new FormData();
        formData.append('username', user.username);
        formData.append('firstname', user.firstName);
        formData.append('lastname', user.lastName);
        formData.append('password', '' + user.password);
        formData.append('login_type', '' + 1);
        
        const req = new HttpRequest('POST', '/api/user/createUser', formData , {
            reportProgress: true,
            responseType: 'text'
        });
       return this.http.request(req);
    }   
    // createFb():Observable<HttpEvent<{}>>{
    //     const req = new HttpRequest('POST', '/api/user/createFb', {
    //         reportProgress: true,
    //         responseType: 'text'
    //     });
    //     return this.http.request(req);
    // }
    createSocialUser(email:string,name:string):Observable<HttpEvent<{}>>
    {


        console.log('User service page');


        //alert('createsocial'+email+'and '+name);

        let formData = new FormData();
        formData.append('username', email);
        formData.append('name', name);
        formData.append('login_type', '' + 2);
        const req = new HttpRequest('POST', '/api/user/createSocialUser', formData , {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);

    }
    createSocial(email:string,name:string):Observable<HttpEvent<{}>>
    {


        console.log('User service page');


        //alert('createsocial'+email+'and '+name);

        let formData = new FormData();
        formData.append('username', email);
        formData.append('name', name);
        formData.append('login_type', '' + 2);
        const req = new HttpRequest('POST', '/api/user/createSocialUser', formData , {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);

    }


    getVideos(id:number):Observable<HttpEvent<{}>>
    {
        const req = new HttpRequest('POST', '/api/user/getVideos/' + id ,{
            reportProgress: true,
            responseType: 'text'
        });


        console.log('user service page'+this.http.request(req));
      
        
        return this.http.request(req);

    }
    getComments(id:string):Observable<HttpEvent<{}>>
    { 
        console.log("user service page"+id);
        const req = new HttpRequest('GET', '/api/user/getComments/' + id ,{
            reportProgress: true,
            responseType: 'text'
        });


        console.log('user service page...'+this.http.request(req));
      
        
        return this.http.request(req);

    }


    createComment(video: Videos): Observable<HttpEvent<{}>> {


        console.log("passed youtube "+video.youtube_link);
        let formData = new FormData();
        
        formData.append('name', video.name);
        formData.append('comment', video.comment);
        formData.append('youtube', video.youtube_link);
       // alert('addressservice -'+address.address+address.contactnumber+address.name);
        const req = new HttpRequest('POST', '/api/user/createComment', formData, {
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