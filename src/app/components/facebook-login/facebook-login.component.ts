import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";


declare const FB:any;

@Component({
    selector: 'facebook-login',
    templateUrl: './facebook-login.html'
})

export class FacebookLoginComponent implements OnInit {

    constructor(private router:Router) {
        FB.init({
            appId      : '132163687254327',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' 
        });
    }

    onFacebookLoginClick() {
        FB.login();
    }

    statusChangeCallback(resp:any) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            this.testAPI();
        }else if (resp.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            alert("The person is logged into Facebook, but not your app.");

        }else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            alert("The person is not logged into Facebook.");
        }
    };
    ngOnInit() {
        FB.getLoginStatus((response:any) => {
            this.statusChangeCallback(response);
        });
    }

    testAPI() {
        FB.api('/me', function(response:any) {
          // alert('Successful login for: ' + response.name);
          
        });
    }
}