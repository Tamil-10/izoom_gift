import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse  } from '@angular/common/http';
import { AlertService } from '../service/alert.service';
import { AuthenticationService} from '../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls:['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    cookieValue = 'UNKNOWN';
    returnUrl: string;
    status:any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    
                  if (data.type == 4) {
                      alert('success');
                      if(data instanceof HttpResponse){
                        console.log('result==='+data.body);    

                        if(data.body=="success")
                        {
                                
                            this.cookieService.set( 'LoggedUser', this.model.username );
                            this.cookieValue = this.cookieService.get('LoggedUser');

                            alert("cookie value."+this.cookieService.get('LoggedUser'));
                            this.router.navigate([this.returnUrl]);
                        }
                        else{
                            alert("Incorrect Username/Password");
                            //location.reload();
                            this.alertService.loginerror();
                    this.loading = false;
                        }
                      
                      
                      
                        }
                  
                  }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
