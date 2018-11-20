import { Component, OnInit } from '@angular/core';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse,HttpClientModule,HttpClientJsonpModule  } from '@angular/common/http';
import { Videos } from '../model/videos';
import { UserService } from '../service/user.service';

import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-video',
  template:  `
  <app-header></app-header>
<p>
  video works!
</p>
<div >
  <div id="place" style="width:100%; height:400px;" #container>
<iframe  id="player" [src]="'https://www.youtube.com/embed/' + id | safe"  allowfullscreen></iframe>
</div>
</div>



<span class="col-md-6 offset-md-3 col-xs-12" style="font-size:20px;top:20px">Comments</span>
<div *ngFor="let data of orderList" class="col-md-6 offset-md-3 col-xs-12" id="total_comments">
  

<div class="comment">
<span style="font-size:20px">{{data.COMMENTS}}</span><span style="font-size:20px;font-color:blue">..{{data.NAME}}</span>
</div>



</div>




<button class="btn" id="add_comment" (click)="click()">Add Comment</button>


<form #f="ngForm" *ngIf="isHidden" id="comment_form" class="col-md-6 offset-md-3 col-xs-12" (ngSubmit)="onSubmit()" >
      
      <input type="text" name="name"  [(ngModel)]="model.name" #name="ngModel"  required>
      <textarea name="comment" [(ngModel)]="model.comment" #comment="ngModel" required></textarea>
      
      <button>Submit</button>
    </form>


`,
  styles: [`

#player{
position:relative;
left:25%;
height:100%;
width:50%;

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
export class VideoComponent implements OnInit {
  id=null;
  model: any = {};
  private orderList: Array<Videos> = [];
  private player;
  private ytEvent;


  constructor( private route:ActivatedRoute,
    private userService: UserService, 
    private videos:Videos,
   private router: Router  ) {

this.route.params.subscribe( params => this.setId(params['id']));

   }

  ngOnInit() {
   
  }

  onSubmit() {
  console.log(this.model);
this.model.youtube_link=this.id;
  this.userService.createComment(this.model).subscribe(data => {
      
    console.log(data);
    if (data.type == 4) {
      //alert('success');
      if(data instanceof HttpResponse){
        console.log('result==='+data.body);    

        if(data.body=="success")
        {
          console.log('result==='+data.body);    
          window.location.reload();
           //this.router.navigate(['video',this.id]);
           // this.router.navigate([this.returnUrl]);
        }
        else{
          console.log('result==='+data.body);    
         //alert('failed');
        }
      }
  
  }
    });







  }



  isHidden: boolean = false;
  click(){
      this.isHidden = !this.isHidden;
  }
  setId(id: string)
  {
    this.id=id;
    this.getComments(this.id);
  }

  getComments(id: string)
  {
    this.userService.getComments(this.id)
    .subscribe(
        data => {
         // console.log("data passed");
          if (data instanceof HttpResponse ) {
            console.log("data passed");
            console.log(data.body);
            // var newData = JSON.stringify(data.body);
            // console.log('values'+ newData);
    
    //        this.orderList=data.body;
           this.orderList = JSON.parse('' + data.body);
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


}
