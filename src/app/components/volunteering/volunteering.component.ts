import { Component, OnInit } from '@angular/core';
import { Opportunity } from '../../constants/data-types';
import { VolunteeringService } from '../../services/volunteering.service';
import { AppStateService } from '../../services/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'volunteering',
  templateUrl: '/volunteering.component.html',
  styleUrls: ['./volunteering.component.css']
})

export class VolunteeringComponent implements OnInit {
  private stepSize:number = null;

  opportunities:Opportunity[] = null;
  displayOpportunities:Opportunity[] = null;
  leftPos:number = null;
  rightPos:number = null;
  displayPagination:boolean = false;

  private subscription:any;

  constructor(private volunteeringService:VolunteeringService,
              private appStateService:AppStateService) {
    this.subscription = this.volunteeringService.opportunities$
      .subscribe(opportunities => {
        this.opportunities = opportunities;
        this.rightPosAdjust();
        this.displayOpportunities = this.opportunities.slice(this.leftPos, this.rightPos);
        this.displayPagination = this.displayOpportunities.length != 0;
      });
  }

  private rightPosAdjust():void {
    this.rightPos = this.leftPos + this.stepSize;
    if (this.opportunities.length < this.rightPos) {
      this.rightPos = this.opportunities.length;
    }
  }

  ngOnInit():void {
    this.volunteeringService.getOpportunities();
    this.leftPos = this.appStateService.volunteerLeftPos;
    this.rightPos = this.appStateService.volunteerRightPos;
    this.stepSize = this.appStateService.volunteerStepSize;
  }

  moveRight():void {
    if (this.leftPos + this.stepSize < this.opportunities.length) {
      this.leftPos += this.stepSize;
      this.rightPosAdjust();
      this.displayOpportunities = this.opportunities.slice(this.leftPos, this.rightPos);
    }
  }

  moveLeft():void {
    if (this.rightPos - this.stepSize > 0) {
      this.leftPos -= this.stepSize;
      this.rightPosAdjust();
      this.displayOpportunities = this.opportunities.slice(this.leftPos, this.rightPos);
    }
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
    this.appStateService.volunteerLeftPos = this.leftPos;
    this.appStateService.volunteerRightPos = this.rightPos;
  }
}
