import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Charity } from '../../constants/data-types';
import { CharityService } from '../../services/charity.service';

@Component({
  selector: 'charities',
  templateUrl: '/charities.component.html',
  styleUrls: ['./charities.component.css']
})

export class CharitiesComponent implements OnInit {
  private stepSize:number = 5;
  
  charities:Charity[] = null;
  displayCharities:Charity[] = null;
  leftPos:number = 0;
  rightPos:number = this.stepSize;
  
  private subscription:any;
  
  constructor(private router:Router,
              private charityService:CharityService) {
    this.subscription = this.charityService.charities$
      .subscribe(charities => {
        this.charities = charities;
        this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
        if (this.charities.length < this.rightPos) {
          this.rightPos = this.charities.length - 1;
        }
      });
  }
  
  ngOnInit():void {
    this.charityService.getCharities();
  }
  
  goToDetail(charity:Charity):void {
    let link = ['/detail', charity.id];
    this.router.navigate(link);
  }
  
  moveRight():void {
    if (this.leftPos + this.stepSize < this.charities.length - 1) {
      this.leftPos += this.stepSize;
      this.rightPos += this.stepSize;
      this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
    }
  }
  
  moveLeft():void {
    if (this.rightPos - this.stepSize > 0) {
      this.leftPos -= this.stepSize;
      this.rightPos -= this.stepSize;
      this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
    }
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
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