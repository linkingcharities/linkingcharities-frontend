import { Injectable } from '@angular/core';

@Injectable()
export class AppStateService {
  /* Control the stepping in charities-component */
  stepSize:number = 6;
  leftPos:number = 0;
  rightPos:number = this.stepSize;
  
  volunteerStepSize:number = 6;
  volunteerLeftPos:number = 0;
  volunteerRightPos:number = this.volunteerStepSize;
}