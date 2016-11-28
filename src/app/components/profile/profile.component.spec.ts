import { TestBed, inject } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

describe('Profile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileComponent
      ]
    });
  });
  
  it('should load', inject([ProfileComponent],
    (profile:ProfileComponent) => {
    }
  ));
});