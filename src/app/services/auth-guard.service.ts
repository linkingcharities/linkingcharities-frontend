import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn:boolean = false;
  
  constructor(private authService:AuthService, private router:Router) {
    authService.login$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }
  
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
    let url:string = state.url;
    return this.checkLogin(url);
  }
  
  checkLogin(url:string):boolean {
    this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}