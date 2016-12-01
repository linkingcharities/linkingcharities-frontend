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

  private subscription:any;

  constructor(private volunteeringService:VolunteeringService,
              private appStateService:AppStateService) {
    this.subscription = this.volunteeringService.opportunities$
      .subscribe(opportunities => {
        this.opportunities = opportunities;
        this.rightPosAdjust();
        this.displayOpportunities = this.opportunities.slice(this.leftPos, this.rightPos);
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
    this.leftPos = this.appStateService.leftPos;
    this.rightPos = this.appStateService.rightPos;
    this.stepSize = this.appStateService.stepSize;
  }

  moveRight():void {
    if (this.leftPos + this.stepSize < this.opportunities.length - 1) {
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
    this.appStateService.leftPos = this.leftPos;
    this.appStateService.rightPos = this.rightPos;
  }
}
