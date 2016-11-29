import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { Response, Http, RequestOptions } from '@angular/http';
import { API_URL } from '../../constants/config';

@Component({
  selector: 'thank-you',
  templateUrl: '/thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})

export class ThankYouComponent implements OnInit {

  business:string = null;
  amount:string = null;
  payment:number = null;
  private sub: any;

  constructor(private router:Router,
              private ar:ActivatedRoute,
              private toasterService:ToasterService,
              private http:Http){}

  ngOnInit():void {
    this.sub = this.ar.params.subscribe(params => {
        this.payment = +params['id'];
    });
    
    let user:String = localStorage.getItem("user");
    if (user) {
      this.http.post(API_URL + '/show_payment', 
      {'username': user, 'payment': this.payment.toString()})
      .toPromise()
      .then((res:Response) => {
        console.log(res.json());
        let data = res.json();
        this.business = data['charity'];
        this.amount = data['amount'];
      }).catch((err:Error) => { 
      this.toasterService.pop('success', '', 'Thank you for your donation.');
    });
//    this.business = window.location.search().business;
//    this.amount = window.location.search().amount;
    } else {
      this.router.navigate(['homepage']);
    }
  }

  goHome():void {
    this.router.navigate(['home']);
  }

  moreCharities():void {
    this.router.navigate(['charities']);
  }

}
