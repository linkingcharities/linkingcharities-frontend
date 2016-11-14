import { Component, OnInit } from '@angular/core';
import { Charity } from '../../constants/data-types';
import { CharityService } from '../../services/charity.service';
import { AppStateService } from '../../services/app-state.service';

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
  
  private subscription:any;
  
  constructor(private charityService:CharityService,
              private appStateService:AppStateService) {
    this.subscription = this.charityService.charities$
      .subscribe(charities => {
        this.charities = charities;
        this.rightPosAdjust();
        this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
      });
  }
  
  private rightPosAdjust():void {
    this.rightPos = this.leftPos + this.stepSize;
    if (this.charities.length < this.rightPos) {
      this.rightPos = this.charities.length;
    }
  }
  
  ngOnInit():void {
    this.charityService.getCharities();
    this.leftPos = this.appStateService.leftPos;
    this.rightPos = this.appStateService.rightPos;
    this.stepSize = this.appStateService.stepSize;
  }
  
  moveRight():void {
    if (this.leftPos + this.stepSize < this.charities.length - 1) {
      this.leftPos += this.stepSize;
      this.rightPosAdjust();
      this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
    }
  }
  
  moveLeft():void {
    if (this.rightPos - this.stepSize > 0) {
      this.leftPos -= this.stepSize;
      this.rightPosAdjust();
      this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
    }
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
    this.appStateService.leftPos = this.leftPos;
    this.appStateService.rightPos = this.rightPos;
  }
  
  // add(name:string):void {
  //   name = name.trim();
  //   if (!name) {
  //     return;
  //   }
  //   this.heroService.create(name)
  //     .then(hero => {
  //       this.heroes.push(hero);
  //       this.selectedHero = null;
  //     });
  // }
  //
  // delete(hero:Hero):void {
  //   this.heroService
  //     .delete(hero.id)
  //     .then(() => {
  //       this.heroes = this.heroes.filter(h => h !== hero);
  //       if (this.selectedHero === hero) {
  //         this.selectedHero = null;
  //       }
  //     });
  // }
  
}