import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'thank-you',
  templateUrl: '/thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})

export class ThankYouComponent implements OnInit {

  business:string = null;
  amount:string = null;
  
  constructor(private router:Router,
              private ar:ActivatedRoute){}

  ngOnInit():void {
//    this.business = window.location.search().business;
//    this.amount = window.location.search().amount;
    console.log(this.ar.params);
  }

  goHome():void {
    this.router.navigate(['home']);
  }

  moreCharities():void {
    this.router.navigate(['charities']);
  }

}
