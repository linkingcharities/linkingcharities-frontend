///<reference path="../../constants/data-types.ts"/>
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Charity, Charity_Target, Charity_Type } from '../../constants/data-types';
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
  type:string = null;
  target:string = null;
  
  // Sample chart data
  // Alternatively this formatting could be shifted inside the chart
  chartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  chartData:any[] = [
    {data: [1, 2, 3, 4, 5, 6, 7], label: 'Donations per year (dollars)'}
  ];
  chartTitle:string = "Donation history";
  
  private subscription:any;
  private subscription2:any;
  
  constructor(private charityService:CharityService,
              private route:ActivatedRoute,
              private http:Http,
              private location:Location,
              private authService:AuthService) {
    this.subscription = this.charityService.charity$
      .subscribe(charity => {
        // At this point, additional information about the charity should be loaded
        this.charity = charity;
        this.type = Charity_Type[charity.type];
        this.target = Charity_Target[charity.target];
      });
    this.subscription2 = this.authService.login$
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
    let userID= localStorage.getItem("userID");
    if (!userID) {
      userID= "donation";
    }
    console.log(this.isLoggedIn);
    console.log(window.location.hostname);
    console.log("Submit form", this.amount);
    // Does the redirect
    window.open('https://www.sandbox.paypal.com/cgi-bin/webscr?&cmd=_xclick&business=' + this.charity.paypal +
      '&currency_code=' + this.currency_code +
      '&amount=' + this.amount +
      '&item_name=' +
      userID +
      '&return=' + 'http://' + window.location.hostname + ':8000/api/make_payment' +
      '&rm=2' +
      '&showHostedThankyouPage=false');
  }
  
  goBack():void {
    this.location.back();
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
