import { TestBed, inject } from '@angular/core/testing';
import { ProjectsPageComponent } from './projects-page.component';

describe('Projects Page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsPageComponent]
    });
  });
  
  it('should load', inject([ProjectsPageComponent],
    (projects:ProjectsPageComponent) => {
    }
  ));
});