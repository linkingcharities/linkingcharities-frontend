import { Component, EventEmitter, Output } from '@angular/core';
import { CharityService } from '../../services/charity.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'charity-form',
  templateUrl: './charity-form.component.html',
  styleUrls: ['./charity-form.component.css']
})

export class CharityFormComponent {
  name:string = null;
  register_id:number = null;
  description:string = null;
  isCharity:boolean = false;
  
  constructor(private charityService:CharityService,
              private authService:AuthService) {
    authService.charity$.subscribe(
      isCharity => this.isCharity = isCharity
    );
  }
  
  ngOnInit() {
    this.authService.isCharity();
  }
  
  onSubmit():void {
    let data = JSON.stringify({
      name: this.name,
      register_id: this.register_id,
      description: this.description
    });
    
    this.charityService.create(data).then(
      () => this.charityService.getCharities()
    );
  }
}