import { Component, OnInit,Output,  NgModule, EventEmitter } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Videos } from '../model/videos';
import {BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { CookieService } from 'ngx-cookie-service';

import { HttpResponse,HttpClientModule,HttpClientJsonpModule  } from '@angular/common/http';
import {
  AuthService,
  FacebookLoginProvider
} from 'angular5-social-login';


// declare const FB: any;
@Component({
  selector: 'app-time-line',
  template: `
  <div >

  <div *ngFor="let data of orderList">

  <p>{{data.youtube_link}}<p>

<div >
  <div id="place" style="width:100%; height:400px;" #container>
<iframe  id="player" [src]="'https://www.youtube.com/embed/' + data.youtube_link | safe"  allowfullscreen></iframe>
</div>
<div class="fb-share-button" data-href="http://izoomstudios.com/video/data.youtube_link" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://izoomstudios.com&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
</div>
<div class="fb-share-button" data-href="http://izoomstudios.com/video/data.youtube_link" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://izoomstudios.com&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
</div>
</div>  
  
  
  `,
  styles: [`

#player{
position:relative;
left:25%;
height:100%;
width:30%;

  }

#total_comments{
  padding-top: 20px;
  padding-bottom: 20px;
}
#add_comment{
  position:relative;
  left:25%;
}
#comment_form{

  padding-top: 20px;
}
.comment{

  outline: 2px solid black;

}


  `],
  providers: [Videos]
})
export class TimeLineComponent implements OnInit {
  id = '3m8405P7V1s';
  userId:number;
  cookieValue = 'UNKNOWN';



  private orderList: Array<Videos> = [];
  private player;
  private ytEvent;

  constructor(        
    private userService: UserService, 
     private videos:Videos,
    private router: Router,     
    private cookieService: CookieService,
    public sanitizer: DomSanitizer
    ) {

    
   }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
  
    this.cookieValue = this.cookieService.get('LoggedUser'); 
    this.getVideos();
  }

getVideos()
{


  this.userService.getVideos(this.userId)
  .subscribe(
      data => {
       // console.log("data passed");
        if (data instanceof HttpResponse ) {
          console.log("data passed");
          console.log(data.body);
          // var newData = JSON.stringify(data.body);
          // console.log('values'+ newData);
  
  //        this.orderList=data.body;
         this.orderList = JSON.parse('' + JSON.stringify(data.body));
          // if(this.orderList.length < 1){
          //   this.router.navigate(['/editshipping']);
          // }
          
        }
        },
        error => {
          console.log('error');    
          //this.router.navigate(['/']);
           // this.alertService.error(error);
          //  this.loading = false;
        }
       
  );
}
  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }
  
  playVideo() {
    this.player.playVideo();
  }
  
  pauseVideo() {
    this.player.pauseVideo();
  }
}@NgModule({
  imports: [ BrowserModule,YoutubePlayerModule,HttpClientModule, // (Required) for share counts
    HttpClientJsonpModule, // (Optional) For linkedIn & Tumblr counts
    ShareButtonsModule.forRoot() ],
  declarations: [ TimeLineComponent],
  bootstrap: [ TimeLineComponent ]
})
export class AppModule {}
