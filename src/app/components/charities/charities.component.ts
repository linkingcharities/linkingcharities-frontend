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
  
  constructor(private router:Router,
              private charityService:CharityService) {
  }
  
  ngOnInit():void {
    // this.charityService.getCharities()
    //   .then(charities => this.charities = charities);
    this.charityService.getCharities()
      .then(charities => {
        this.charities = charities;
        this.displayCharities = this.charities.slice(this.leftPos, this.rightPos);
        if (this.charities.length < this.rightPos) {
          this.rightPos = this.charities.length - 1;
        }
      });
  }
  
  goToDetail(charity:Charity):void {
    let link = ['/detail', charity.id];
    this.router.navigate(link);
  }
  
  updateCharities():void {
    this.charityService.getCharities()
      .then(charities => {
        this.charities = charities;
        // Update the displayed charities based on existing filter
      });
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
}