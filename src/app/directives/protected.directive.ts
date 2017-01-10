import { Directive, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Directive({
  selector: '[protected]'
})

export class ProtectedDirective implements OnDestroy {
  private sub:any = null;
  
  constructor(private authService:AuthService, private router:Router, private location:Location) {
    if (!authService.checkLogin) {
      this.router.navigate(['/login']);
    }
    
    this.sub = authService.login$.subscribe(
      (isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        } else {
          console.log("WE ARE HERE", this.router.url);
          this.router.navigateByUrl(this.router.url);
        }
      }
    );
  }
  
  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }
}