import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User, Payment } from '../constants/data-types';
import { Subject } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { API_URL } from '../constants/config';
import { isUndefined } from 'util';
declare const FB:any;

var users = [
  new User('mark', '12345', 'false'),
  new User('charity1', '12345', 'true')
];

@Injectable()
export class AuthService {
  private headers = new Headers({'Content-Type': 'application/json'});
  redirectUrl:string;
  checkLogin:boolean = false;
  
  // To communicate a login to components
  private loginSource = new Subject<boolean>();
  login$ = this.loginSource.asObservable();
  
  // To communicate account type to components
  private accountSource = new Subject<string>();
  accountType$ = this.accountSource.asObservable();
  
  // To communicate username to components
  private usernameSource = new Subject<string>();
  userName$ = this.usernameSource.asObservable();
  
  // To communication payment info to components
  private paymentsSource = new Subject<Payment[]>();
  payments$ = this.paymentsSource.asObservable();
  
  // Info about the user
  payments:Payment[] = null;
  
  constructor(private http:Http,
              private router:Router,
              private toasterService:ToasterService) {
  }
  
  isLoggedIn() {
    var username = localStorage.getItem("username");
    var userID = localStorage.getItem("userID");
    this.checkLogin = username !== null || userID !== null;
    this.loginSource.next(this.checkLogin);
    if (username !== null && !isUndefined(username)) {
      this.usernameSource.next(username);
    }
  }
  
  userLogin(username:String, password:String) {
    this.http.post(API_URL + '/login'
      , {username: username, password: password})
      .toPromise()
      .then((res:Response) => {
        localStorage.setItem("username", username.toString());
        let resp_json = res.json();
        localStorage.setItem("token", resp_json.token);
        localStorage.setItem("userID", resp_json.id);
        this.toasterService.pop('success', '', 'Login successful');
        this.isLoggedIn();
        
        // Load additional user information
        this.loadUserInfo(resp_json.id);
        
        // Redirect the user
        this.router.navigate(['/home']);
      }).catch((err:Error) => {
      this.toasterService.pop('error', '', 'Login failed');
    });
  }
  
  loadUserInfo(userID:String) {
    console.log(userID);
    this.http.get(API_URL + `/account_info/?account_id=${userID}`)
      .toPromise()
      .then((res:Response) => {
        let response = res.json();
        if (response.is_charity) {
          localStorage.setItem("charity", 'true');
          localStorage.setItem("charityID", response.charity_id);
        }
        this.payments = response.payments as Payment[];
        this.paymentsSource.next(this.payments);
      })
  }
  
  registerUser(username:String, password:String) {
    this.http.post(API_URL + '/donor/register',
      {account: {username: username, password: password}})
      .toPromise()
      .then((res:Response) => {
        
        this.toasterService.pop('success', '', 'Donor signup successful');
        localStorage.setItem("username", username.toString());
        this.isLoggedIn();
        
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.redirectUrl ? this.redirectUrl : '/home';
        redirect = this.router.url != '/signup' ? this.router.url : redirect;
        
        // Redirect the user
        console.log(redirect);
        this.router.navigate([redirect]);
      }).catch((err:Error) => {
      this.toasterService.pop('error', '', 'Registration failed');
      this.isLoggedIn()
    });
  }
  
  registerCharity(data:any) {
    this.http.post(API_URL + '/charity/register',
      {
        account: {username: data['username'], password: data['password']},
        paypal: data['paypal'], description: data['description']
      })
      .toPromise()
      .then((res:Response) => {
        console.log(data['type']);
        this.http.post(API_URL + '/charities',
          {
            username: data['username'],
            name: data['name'],
            register_id: data['register_id'],
            target: data['target'],
            type: data['type'],
            paypal: data['paypal'],
            description: data['description'],
            total_income: data['total_income']
          })
          .toPromise()
          .then((res:Response) => {
            localStorage.setItem("user", data['username'].toString());
            this.toasterService.pop('success', '', 'Charity signup successful');
            this.isLoggedIn();
            
            this.router.navigate(['/home']);
          }).catch((err:Error) => {
          //May be customise the error info in the future?
          this.toasterService.pop('error', '', 'Charity register failed.')
        });
      }).catch((err:Error) => {
      this.toasterService.pop('error', '', 'Charity register failed.');
    });
  }
  
  isCharity() {
    if (localStorage.getItem("charity") === 'true') {
      this.accountSource.next('charity')
    }
  }
  
  getCharityID() {
    return localStorage.getItem("charityID");
  }
  
  getPayments() {
    if (this.payments !== null) {
      this.paymentsSource.next(this.payments);
      return;
    }
    this.loadUserInfo(localStorage.getItem("userID"));
  }
  
  accountType() {
    // It could be argued that FB is just an alternative auth method but we ignore for now
    if (localStorage.getItem("charity") === 'true') {
      this.accountSource.next('charity')
    } else if (localStorage.getItem("fb") === 'true') {
      this.accountSource.next('fb');
    } else if (localStorage.getItem("username") !== null) {
      this.accountSource.next('donor');
    }
  }
  
  logout() {
    // Clearing localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    localStorage.removeItem("charity");
    localStorage.removeItem("fb");
    localStorage.removeItem("userID");
    localStorage.removeItem("charityID");
    
    this.loginSource.next(false);
    this.accountSource.next('none');
    this.checkLogin = false;
    this.payments = null;
    this.toasterService.pop('success', '', 'Logout successful');
  }
  
  /* FB Auth Service */
  
  initFb() {
    FB.init({
      appId: '132163687254327',
      cookie: true,  // enable cookies to allow the server to access
                     // the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8'
    });
  }
  
  setLoginAttributesFb(userID:string) {
    localStorage.setItem("userID", userID);
    localStorage.setItem("fb", 'true');
    this.isLoggedIn();
  }
  
  logoutViaFb() {
    //call getLoginStatus to ensure that fb API is fully ready after Init
    FB.getLoginStatus(function (response:any) {
      if (localStorage.getItem("fb") === 'true') {
        FB.logout(function (response:any) {
          localStorage.removeItem("fb");
          localStorage.removeItem("userID");
          // localStorage.removeItem("username");
          // this.loginSource.next(false);
          // this.toasterService.pop('success', '', 'Logout successful');
        });
      }
    });
  }
  
  loginViaFb() {
    FB.getLoginStatus((resp:any) => {
      if (resp.status != 'connected') {
        FB.login((response:any) => {
          this.statusChangeFb(response);
        });
      }
      else {
        this.statusChangeFb(resp);
      }
    });
  }
  
  statusChangeFb(resp:any) {
    if (resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
      
      this.setLoginAttributesFb(resp.authResponse.userID);
      this.toasterService.pop('success', '', 'Login successful');
      
      // Get username
      this.getUsernameFb();
      
      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      let redirect = this.redirectUrl ? this.redirectUrl : '/home';
      redirect = this.router.url != '/login' ? this.router.url : redirect;
      
      // Redirect the user
      this.router.navigate([redirect]);
    } else if (resp.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      this.toasterService.pop('error', '', 'Login not authorised');
      console.log("The person is not authorized to login.");
      
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log("The person is not logged into Facebook.");
    }
  }
  
  shareOnFb(amount:string, business:string) {
    this.initFb();
    FB.ui({
      method: 'share',
      quote: 'I HAVE JUST DONATED ' + amount + ' TO '+ business +'!',
      hashtag: '#charilink',
      href: '138.68.147.114/home',
    }, function (response:any) {
    });
  }
  
  getUsernameFb() {
    FB.api('/me', {fields: 'first_name'}, (resp:any) => {
      let name = resp.first_name.split(' ')[0];
      localStorage.setItem("username", name);
      this.usernameSource.next(name);
    });
  }
  
  
  // Error handliing - required for HTTP
  // private handleError(error:any):Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
