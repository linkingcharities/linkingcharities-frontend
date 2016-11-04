import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
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
        FB.init({
            appId      : '132163687254327',
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' 
        });
        authService.login$.subscribe(
          isLoggedIn => this.isLoggedIn = isLoggedIn
        );
    }

    statusChangeCallback(resp:any) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            this.authService.loginViaFb(resp.authResponse.userID);
            if (this.isLoggedIn) {
              
             FB.api('/me', function(response:any) {
               this.toasterService.pop('success', '', 'Welcome, ' + response.name + '.');
             });
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'home';
              
            // Redirect the user
            this.router.navigate([redirect]);
            
            }
        }else if (resp.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            console.log("The person is logged into Facebook, but not your app.");

        }else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            console.log("The person is not logged into Facebook.");
        }
    };

    onFacebookLoginClick() {
        FB.login((response:any) =>  {
            this.statusChangeCallback(response);
        });

    }

    ngOnInit() {
        FB.getLoginStatus((response:any) => {
            this.statusChangeCallback(response);
        });
    }
} 
