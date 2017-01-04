import { Component, Input, OnInit } from '@angular/core';
import { Opportunity } from '../../constants/data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'volunteering-grid',
  templateUrl: './volunteering-grid.component.html',
  styleUrls: ['./volunteering-grid.component.css']
})

export class VolunteeringGridComponent implements OnInit {
  @Input() opportunity:Opportunity;

  constructor(private router:Router) {
  }

  ngOnInit() {
  }

  goToDetail(opportunity:Opportunity):void {
    let link = ['/o-detail', opportunity.id];
    this.router.navigate(link);
  }
}
