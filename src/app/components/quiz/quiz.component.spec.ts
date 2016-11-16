import { TestBed, inject } from '@angular/core/testing';
import { QuizPageComponent } from './quiz.component';

describe('Quiz Page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizPageComponent]
    });
  });
  
  it('should load', inject([QuizPageComponent],
    (quiz:QuizPageComponent) => {
    }
  ));
});