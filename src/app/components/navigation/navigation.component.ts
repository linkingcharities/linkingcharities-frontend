import { Component, OnInit, HostListener } from '@angular/core';
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
  fixedHeader:boolean = false;
  
  @HostListener('window:scroll', ['$event'])
  fixHeader(event:any) {
    //this.fixedHeader = (document.body.scrollTop > 0);
  }
  
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
  }
  
  logout():void {
    this.authService.logoutViaFb();
    this.authService.logout();
    // this.router.navigate(['/home']);
  }

  profile():void {
    this.router.navigate(['/charity-form']);
  }
  
}
