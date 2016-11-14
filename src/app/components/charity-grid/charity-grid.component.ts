import { Component, Input, OnInit } from '@angular/core';
import { Charity, Charity_Type, Charity_Target } from '../../constants/data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'charity-grid',
  templateUrl: './charity-grid.component.html',
  styleUrls: ['./charity-grid.component.css']
})

export class CharityGridComponent implements OnInit {
  @Input() charity:Charity;
  charityType:string = null;
  charityTarget:string = null;
  
  constructor(private router:Router) {
  }
  
  ngOnInit() {
    this.charityType = Charity_Type[this.charity.type];
    this.charityTarget = Charity_Target[this.charity.target];
  }
  
  goToDetail(charity:Charity):void {
    let link = ['/detail', charity.id];
    this.router.navigate(link);
  }
}
