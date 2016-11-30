import { TestBed, inject } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs/Rx';

class AuthServiceStub {
  accountTypeSource = new Subject<string>();
  accountType$ = this.accountTypeSource.asObservable();
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