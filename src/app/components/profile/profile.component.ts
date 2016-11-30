import { Component } from "@angular/core";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: '/profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  isCharity:boolean = false;
  isFb:boolean = false;
  
  private subscription:any;
  
  constructor(private authService:AuthService) {
    this.subscription = authService.accountType$.subscribe(
      accountType => {
        this.isCharity = (accountType === 'charity');
        this.isFb = (accountType === 'fb');
      }
    );
  }
  
  ngOnInit() {
    this.authService.accountType();
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }
}