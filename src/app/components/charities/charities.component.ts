import { Component, OnInit } from '@angular/core';
import {
  Charity,
  CharitySearchQuery,
  DefaultTarget,
  DefaultType,
  Charity_Type,
  CharityType
} from '../../constants/data-types';
import { CharityService } from '../../services/charity.service';
import { AppStateService } from '../../services/app-state.service';
import { Params, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'charities',
  templateUrl: '/charities.component.html',
  styleUrls: ['./charities.component.css']
})

export class CharitiesComponent implements OnInit {
  private stepSize:number = null;
  
  charities:Charity[] = null;
  displayCharities:Charity[] = null;
  leftPos:number = null;
  rightPos:number = null;
  displayPagination:boolean = false;
  leftLim = true;
  rightLim = false;
  
  private subscription:any;
  
  // To load the types
  searchQuery:CharitySearchQuery = {
    term: '',
    target: DefaultTarget,
    type: DefaultType
  };
  
  constructor(private charityService:CharityService,
              private appStateService:AppStateService,
              private route:ActivatedRoute) {
    this.subscription = this.charityService.charities$
      .subscribe(charities => {
        this.charities = charities;
        this.rightPosAdjust();
        this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
        this.displayPagination = this.displayCharities.length != 0;
        this.checkPos();
      });
  }
  
  private rightPosAdjust():void {
    this.rightPos = this.leftPos + this.stepSize;
    if (this.charities.length < this.rightPos) {
      this.rightPos = this.charities.length;
    }
  }
  
  ngOnInit():void {
    this.route.params.forEach((params:Params) => {
      let type = params['type'];
      if (!isUndefined(type)) {
        if (type in Charity_Type) {
          this.searchQuery.type = new CharityType(type, Charity_Type[type]);
          this.charityService.search(this.searchQuery);
        } else {
          this.charityService.getCharities();
        }
      } else {
        this.charityService.getCharities();
      }
    });
    
    this.leftPos = this.appStateService.leftPos;
    this.rightPos = this.appStateService.rightPos;
    this.stepSize = this.appStateService.stepSize;
    
  }
  
  moveRight():void {
    if (this.leftPos + this.stepSize < this.charities.length) {
      this.leftPos += this.stepSize;
      this.rightPosAdjust();
      this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
    }
    this.checkPos();
  }
  
  moveLeft():void {
    if (this.rightPos - this.stepSize > 0) {
      this.leftPos -= this.stepSize;
      this.rightPosAdjust();
      this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
    }
    this.checkPos();
  }
  
  checkPos():void {
    this.leftLim = this.leftPos == 0;
    this.rightLim = this.rightPos == this.charities.length;
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
    this.appStateService.leftPos = this.leftPos;
    this.appStateService.rightPos = this.rightPos;
  }
  
}