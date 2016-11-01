import { TestBed, inject } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { Router } from '@angular/router';

describe('Home Page Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router},
        HomePageComponent
      ]
    });
  });
  
  it('should load', inject([HomePageComponent],
    (home:HomePageComponent) => {
    }
  ));
});