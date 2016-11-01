import { TestBed, inject } from '@angular/core/testing';
import { AboutPageComponent } from './about-page.component';

describe('About Page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AboutPageComponent
      ]
    });
  });
  
  it('should load', inject([AboutPageComponent],
    (about:AboutPageComponent) => {
    }
  ));
});