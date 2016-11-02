import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

describe('Page not found Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router},
        PageNotFoundComponent
      ]
    });
  });
  
  it('should load', inject([PageNotFoundComponent],
    (pageNotFound:PageNotFoundComponent) => {
    }
  ));
});