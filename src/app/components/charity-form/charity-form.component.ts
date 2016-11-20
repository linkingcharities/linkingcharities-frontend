import { Component, EventEmitter, Output } from '@angular/core';
import { CharityService } from '../../services/charity.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CharityType, CharityTypes, 
         CharityTarget, CharityTargets} from '../../constants/data-types';

@Component({
  selector: 'charity-form',
  templateUrl: './charity-form.component.html',
  styleUrls: ['./charity-form.component.css']
})

export class CharityFormComponent {
  username:string = null;
  password:string = null;
  name:string = null;
  register_id:number = null;
  type:CharityType = null;
  target:CharityTarget = null;
  paypal:string = null;
  description:string = null;
  isCharity:boolean = false;

  charityTargets:CharityTarget[] = CharityTargets;
  charityTypes:CharityType[] = CharityTypes;
  
  constructor(private charityService:CharityService,
              private authService:AuthService,
              private router:Router) {
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
 
  createUserAccount():void {
    this.router.navigate(['/signup']);
  }

}
