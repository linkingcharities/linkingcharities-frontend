import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

class AuthServiceStub {
  private loginSource = new Subject<boolean>();
  login$ = this.loginSource.asObservable();
}

describe('Login Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: Router},
        LoginComponent
      ]
    });
  });
  
  it('should have correct initial state', inject([LoginComponent],
    (login:LoginComponent) => {
      expect(login.isLoggedIn).toEqual(false);
      expect(login.username).toEqual(null);
      expect(login.password).toEqual(null);
    }
  ));
});