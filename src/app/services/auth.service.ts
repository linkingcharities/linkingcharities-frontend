import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../constants/data-types';
import { Subject } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { API_URL } from '../constants/config';
declare const FB:any;

var users = [
  new User('mark', '12345', 'false'),
  new User('charity1', '12345', 'true')
];

@Injectable()
export class AuthService {
  private headers = new Headers({'Content-Type': 'application/json'});
  redirectUrl:string;
  
  // To communicate a login to components
  private loginSource = new Subject<boolean>();
  login$ = this.loginSource.asObservable();
  
  // To communicate charity status to components
  private charitySource = new Subject<boolean>();
  charity$ = this.charitySource.asObservable();
  
  constructor(private http:Http,
              private router:Router,
              private toasterService:ToasterService) {
  }
  
  // May have to change this to an observable (to allow for pages to authenticate in other tabs)
  login(username:String, password:String) {
    var authenticatedUser = users.find(u => u.email === username);
    if (authenticatedUser && authenticatedUser.password === password) {
      localStorage.setItem("user", authenticatedUser.email);
      localStorage.setItem("charity", authenticatedUser.charity);
      
      this.toasterService.pop('success', '', 'Login successful');
    } else {
      this.toasterService.pop('error', '', 'Login failed');
    }
    this.isLoggedIn();
  }
  
  isLoggedIn() {
    this.loginSource.next(localStorage.getItem("user") !== null);
  }

  userLogin(username:String, password:String) {
    this.http.post(API_URL + '/login'
        , { username: username, password: password })
      .toPromise()
      .then((res:Response) => {
        localStorage.setItem("user", username.toString());
        localStorage.setItem("token", res.json());
        this.toasterService.pop('success', '', 'Login successful');
        this.isLoggedIn();
  
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.redirectUrl ? this.redirectUrl : 'home';
  
        // Redirect the user
        this.router.navigate([redirect]);
      }).catch();
  }

  registerUser(username:String, password:String) {
    this.http.post(API_URL + '/donor/register',
                  {account: {username: username, password: password }})
      .toPromise()
      .then((res:Response) => {
        //user is logged in after successful signup
        localStorage.setItem("user", username.toString());
        this.toasterService.pop('success', '', 'Signup successful');
        this.isLoggedIn();
      }).catch();
  }

  isCharity() {
    this.charitySource.next(localStorage.getItem("charity") === 'true');
  }
  
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("charity");
    this.loginSource.next(false);
    this.charitySource.next(false);
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
    localStorage.setItem("user", userID);
    localStorage.setItem("fb", 'true');
    this.isLoggedIn();
  }
  
  logoutViaFb() {
    //call getLoginStatus to ensure that fb API is fully ready after Init
    FB.getLoginStatus(function (response:any) {
      if (localStorage.getItem("fb") === 'true') {
        FB.logout(function (response:any) {
          localStorage.removeItem("fb");
          // localStorage.removeItem("user");
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

      if (this.isLoggedIn) {
        
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.redirectUrl ? this.redirectUrl : 'home';
        
        // Redirect the user
        this.router.navigate([redirect]);
        
      }
    } else if (resp.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log("The person is not authorized to login.");
      
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log("The person is not logged into Facebook.");
    }
  }
  
  
  // Error handliing - required for HTTP
  // private handleError(error:any):Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
