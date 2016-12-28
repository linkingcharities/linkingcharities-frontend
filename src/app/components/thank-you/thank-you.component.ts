import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { Response, Http, RequestOptions } from '@angular/http';
import { API_URL } from '../../constants/config';
import { AuthService } from '../../services/auth.service';

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
              private http:Http,
              private authService:AuthService){}

  ngOnInit():void {
    this.sub = this.ar.params.subscribe(params => {
        this.payment = +params['id'];
    });
    
    let user:String = localStorage.getItem("username");
    if (user) {
      this.http.post(API_URL + '/show_payment', 
      {'username': user, 'payment': this.payment.toString()})
      .toPromise()
      .then((res:Response) => {
        console.log("Reached");
        console.log(res.json());
        let data = res.json();
        this.business = data['charity'];
        this.amount = data['amount'];
      }).catch((err:Error) => { 
      this.toasterService.pop('success', '', 'Thank you for your donation.');
    });
    } else {
      this.router.navigate(['home']);
    }
  }

  goHome():void {
    this.router.navigate(['home']);
  }

  moreCharities():void {
    this.router.navigate(['charities']);
  }

  shareFb(amount:string, business:string):void {
    this.authService.shareOnFb(amount, business);
  }

}
