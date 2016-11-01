import { TestBed, inject } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';

class AuthServiceStub {
  loginSource = new Subject<boolean>();
  login$ = this.loginSource.asObservable();
}

describe('Navigation Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: Router},
        NavigationComponent
      ]
    });
  });
  
  it('should have correct initial state', inject([NavigationComponent],
    (nav:NavigationComponent) => {
      expect(nav.isLoggedIn).toEqual(false);
    }
  ));
  
  it('should change state when a new value is received', inject([NavigationComponent, AuthService],
    (nav:NavigationComponent, auth:AuthServiceStub) => {
      auth.loginSource.next(true);
      expect(nav.isLoggedIn).toEqual(true);
      
      auth.loginSource.next(false);
      expect(nav.isLoggedIn).toEqual(false);
    }
  ));
});