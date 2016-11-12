import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  isLoggedIn:boolean = false;
  menuOpen:boolean = false;
  
  constructor(private router:Router,
              private authService:AuthService) {
    authService.login$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }
  
  toggleMenu():void {
    this.menuOpen = !this.menuOpen;
  }
  
  ngOnInit():void {
    this.authService.isLoggedIn();
    
    // $(".nav li").click(function () {
    //   $(".nav li").removeClass('active');
    //   console.log("RUN");
    // });
  }
  
  logout():void {
    this.authService.logoutViaFb();
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  
}