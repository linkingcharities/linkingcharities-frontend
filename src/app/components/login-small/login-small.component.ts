import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-small',
  templateUrl: './login-small.component.html',
  styleUrls: ['./login-small.component.css']
})

export class LoginSmallComponent {
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
    this.authService.userLogin(this.username, this.password);
  }
}
