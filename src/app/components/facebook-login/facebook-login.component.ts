import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare const FB:any;

@Component({
  selector: 'facebook-login',
  templateUrl: './facebook-login.html'
})

export class FacebookLoginComponent implements OnInit {
  
  isLoggedIn = false;
  
  constructor(private router:Router,
              private authService:AuthService) {
    
    authService.initFb();
    
    authService.login$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }
  
  onFacebookLoginClick() {
    if (!this.isLoggedIn) {
      this.authService.loginViaFb();
    }
  }
  
  ngOnInit() {
    // Uncomment this if you want the user to auto login to the app if he/she
    // has login into fb
    // FB.getLoginStatus((response:any) => {
    //     this.statusChangeCallback(response);
    // });
  }
} 
