import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

class AuthServiceStub {
  public mockUsername = 'rs';
  public mockPassword = 'roysonisthebest';
  redirectUrl:string = 'test';

  loginSource = new Subject<boolean>();
  login$ = this.loginSource.asObservable();
  
  userLogin(username:String, password:String){
  };
}

class RouterStub {
  navigate(link:string[]) {
    return link;
  }
}

describe('Login Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: Router, useClass: RouterStub},
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

  it('should change state and redirect when login success', inject([LoginComponent, AuthService, Router],
    (login:LoginComponent, auth:AuthServiceStub, router:RouterStub) => {
      const spy = spyOn(router, 'navigate');
      auth.userLogin(auth.mockUsername, auth.mockPassword);
      login.onSubmit();
      if (login.isLoggedIn) {
        auth.loginSource.next(true);
        expect(login.isLoggedIn).toEqual(true);

        const loginArgs = spy.calls.first().args[0];
        if (auth.redirectUrl) {
          expect(loginArgs).toEqual([auth.redirectUrl]);
        }
        else {
          expect(loginArgs).toEqual(['home']);
        }
      } else {
        auth.loginSource.next(false);
        expect(login.isLoggedIn).toEqual(false);
      }
      
    }
  ));

});