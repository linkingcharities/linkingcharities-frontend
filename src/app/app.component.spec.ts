import { TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent]
    });
  });
  
  it('should have correct title', inject([AppComponent],
    (app:AppComponent) => {
      expect(app.title).toEqual('ChariLink');
    }
  ));
});