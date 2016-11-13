import { Component, Input } from '@angular/core';
import { Charity } from '../../constants/data-types';

@Component({
  selector: 'charity-grid',
  templateUrl: './charity-grid.component.html',
  styleUrls: ['./charity-grid.component.css']
})

export class CharityGridComponent {
  @Input() charity:Charity;
  
  constructor() {
  }
}
