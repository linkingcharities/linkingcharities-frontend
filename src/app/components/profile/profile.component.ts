import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Payment } from '../../constants/data-types';

@Component({
  selector: 'profile',
  templateUrl: '/profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  isCharity:boolean = false;
  isFb:boolean = false;
  isDonor:boolean = false;
  username:string;
  payments:Payment[];
  
  private subscription:any;
  private subscription2:any;
  private sub_payments:any;
  
  constructor(private authService:AuthService) {
    this.subscription = authService.accountType$.subscribe(
      accountType => {
        this.isCharity = (accountType === 'charity');
        this.isFb = (accountType === 'fb');
        this.isDonor = (accountType === 'donor');
      }
    );
    
    this.subscription2 = authService.userName$.subscribe(
      username => this.username = username
    );
    
    this.sub_payments = authService.payments$.subscribe(
      payments => this.payments = payments
    )
  }
  
  ngOnInit() {
    this.authService.isLoggedIn();
    this.authService.accountType();
    this.authService.getPayments();
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.sub_payments.unsubscribe();
  }
}