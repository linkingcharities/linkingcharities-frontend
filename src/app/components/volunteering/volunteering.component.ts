import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'volunteering',
  templateUrl: '/volunteering.component.html',
  styleUrls: ['./volunteering.component.css']
})

export class VolunteeringComponent implements OnInit {

  constructor(private router:Router){}

  ngOnInit():void {

  }


}
