import { Component, OnInit, HostListener, ElementRef  } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class GiftsComponent implements OnInit {

  
  state = 'show'

  constructor(public el: ElementRef) { }  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset

    if (scrollPosition <= componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }

  }
  ngOnInit() {}
  
  
}
