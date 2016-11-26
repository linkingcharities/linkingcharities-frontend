import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Charity } from '../../constants/data-types';
import { CharityService } from '../../services/charity.service';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'charity-detail',
  templateUrl: './charity-detail.component.html',
  styleUrls: ['./charity-detail.component.css']
})

export class CharityDetailComponent implements OnInit {
  charity:Charity;
  amount:number = 1.00;
  currency_code:string = 'USD';
  isLoggedIn = false;

  private subscription:any;
  
  constructor(private charityService:CharityService,
              private route:ActivatedRoute,
              private http:Http,
              private location:Location,
              private authService:AuthService) {
    this.subscription = this.charityService.charity$
      .subscribe(charity => {
        this.charity = charity
      });
    this.subscription = this.authService.login$
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      });
  }
  
  ngOnInit():void {
    this.route.params.forEach((params:Params) => {
      let id = +params['id'];
      this.charityService.getCharity(id);
    });
  }
  
  onSubmit():void {
    let username = localStorage.getItem("user");
    if (!username) {
      username = "donation";
    }
    console.log(this.isLoggedIn);
    console.log(window.location.hostname);
    console.log("Submit form", this.amount);
    // Does the redirect
     window.open('https://www.sandbox.paypal.com/cgi-bin/webscr?&cmd=_xclick&business='     + this.charity.paypal + 
     '&currency_code=' + this.currency_code + 
     '&amount=' + this.amount + 
     '&item_name=' +
     username +
     '&return=' + 'http://' + window.location.hostname + ':8000/api/make_payment' + 
     '&rm=2' + 
     '&showHostedThankyouPage=false');
  }
  
  // save():void {
  //   this.heroService.update(this.hero)
  //     .then(() => this.goBack());
  // }
  //
  
  goBack():void {
    this.location.back();
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }
}
