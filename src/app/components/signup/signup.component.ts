import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  username:String = null;
  password:String = null;
  isLoggedIn = false;
  
  constructor(private router:Router,
              private authService:AuthService) {
    authService.login$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }
  
  onSubmit():void {
    this.authService.registerUser(this.username, this.password);
  }

  charityCreation():void {
    this.router.navigate(['/charity-form']);
  }
 
}
