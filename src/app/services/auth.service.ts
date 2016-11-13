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
        console.log(res);
        localStorage.setItem("token", res.json());
        this.toasterService.pop('success', '', 'Login successful');
        this.isLoggedIn();
      }).catch();
  }

  isCharity() {
    this.charitySource.next(localStorage.getItem("charity") === 'true');
  }

  loginViaFb(userID:string) {
    localStorage.setItem("user", userID);
    localStorage.setItem("fb", 'true');
    this.isLoggedIn();
  }

  logoutViaFb(){
    if (localStorage.getItem("fb") === 'true') {
      FB.logout(function(response:any) {
        localStorage.removeItem("fb");
        // localStorage.removeItem("user");
        // this.loginSource.next(false);
        // this.toasterService.pop('success', '', 'Logout successful');
      });
      }
  }
  
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("charity");
    this.loginSource.next(false);
    this.charitySource.next(false);
    this.toasterService.pop('success', '', 'Logout successful');
  }
  
  
  // Error handliing - required for HTTP
  // private handleError(error:any):Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
