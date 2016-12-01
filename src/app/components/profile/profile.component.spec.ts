import { TestBed, inject } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs/Rx';
import { Payment } from '../../constants/data-types';

class AuthServiceStub {
  accountTypeSource = new Subject<string>();
  accountType$ = this.accountTypeSource.asObservable();
  
  userNameSource = new Subject<string>();
  userName$ = this.userNameSource.asObservable();
  
  paymentSource = new Subject<Payment[]>();
  payments$ = this.paymentSource.asObservable();
}

describe('Profile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        ProfileComponent
      ]
    });
  });
  
  it('should load', inject([ProfileComponent],
    (profile:ProfileComponent) => {
    }
  ));
});