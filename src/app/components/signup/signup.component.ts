import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  username:string = null;
  password:string = null;
  passwordConfirm:string = null;
  isLoggedIn = false;
  usernameTaken = false;
  passwordMismatch = false;
  
  constructor(private router:Router,
              private authService:AuthService) {
    authService.login$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (this.username !== null) {
          this.usernameTaken = !this.isLoggedIn;
        }
      }
    );
  }
  
  ngOnInit():void {
    this.authService.isLoggedIn();
  }
  
  onSubmit():void {
    if (this.password != this.passwordConfirm) {
      this.passwordMismatch = true;
      return
    }
    this.passwordMismatch = false;
    this.authService.registerUser(this.username, this.password);
  }
  
  charityCreation():void {
    this.router.navigate(['/charity-form']);
  }
  
}
