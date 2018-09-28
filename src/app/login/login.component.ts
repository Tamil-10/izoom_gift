import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse  } from '@angular/common/http';
import { AlertService } from '../service/alert.service';
import { AuthenticationService} from '../service/authentication.service';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    status:any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

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
         
                   this.router.navigate([this.returnUrl]);
                //   if (data instanceof HttpResponse ) {
                //       alert("dsakfjd");
                //     console.log("15414"+data.body);
                //   this.status =  data.body;
                //   alert('nsdf---------'+this.status)
                //   alert('asa-'+this.status);}
                //   console.log('hwjfbh---'+this.status)
                  if (data.type == 4) {
                      alert('success');
                      if(data instanceof HttpResponse){
                          console.log('sdahb==='+data.body);    
                      }
                  
                  }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
