import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'thank-you',
  templateUrl: '/thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})

export class ThankYouComponent implements OnInit {
  
  constructor(private router:Router,
    private authService:AuthService){}

  ngOnInit():void {
    
  }

  goHome():void {
    this.router.navigate(['home']);
  }

  moreCharities():void {
    this.router.navigate(['charities']);
  }

  shareFb():void {
    this.authService.shareOnFb();
  }

}
