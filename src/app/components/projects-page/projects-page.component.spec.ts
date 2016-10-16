import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ProjectsPageComponent } from "./projects-page.component";

describe('Projects Page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsPageComponent],
      // Shallow testing
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  it('should work', () => {
    let fixture = TestBed.createComponent(ProjectsPageComponent);
    let comp = fixture.componentInstance;
    expect(comp instanceof ProjectsPageComponent).toBe(true, 'should create ProjectsPageComponent');
  });
});