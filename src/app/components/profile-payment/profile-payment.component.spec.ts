import { TestBed, inject } from '@angular/core/testing';
import { ProfilePaymentComponent } from './profile-payment.component';

describe('Profile payment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilePaymentComponent]
    });
  });
  
  it('should load', inject([ProfilePaymentComponent],
    (profilePayment:ProfilePaymentComponent) => {
    }
  ));
});