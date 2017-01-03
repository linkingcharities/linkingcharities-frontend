import { Component } from '@angular/core';
import { CharityService } from '../../services/charity.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  CharityType,
  CharityTypes,
  CharityTarget,
  CharityTargets,
  DefaultTarget,
  DefaultType
} from '../../constants/data-types';


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
  type:CharityType = DefaultType;
  target:CharityTarget = DefaultTarget;
  paypal:string = null;
  description:string = null;
  activity:number = null;
  fundraising:number = null;
  admin:number = null;
  isCharity:boolean = false;
  
  charityTargets:CharityTarget[] = CharityTargets;
  charityTypes:CharityType[] = CharityTypes;
  
  constructor(private charityService:CharityService,
              private authService:AuthService,
              private router:Router) {
    authService.accountType$.subscribe(
      accountType => this.isCharity = (accountType === 'charity')
    );
  }
  
  ngOnInit() {
    this.authService.isCharity();
  }
  
  onSubmit():void {
    let data = {
      username: this.username,
      password: this.password,
      name: this.name,
      register_id: this.register_id,
      description: this.description,
      type: this.type.short,
      target: this.target.short,
      paypal: this.paypal,
      total_income: 1,
      charitableActivity: this.activity,
      fundraising: this.fundraising,
      admin: this.admin
    };
    
    this.authService.registerCharity(data);
    
    /* this.charityService.create(data).then(
     () => this.charityService.getCharities()
     ); */
    
  }
  
  createUserAccount():void {
    this.router.navigate(['/signup']);
  }
  
  modifyTarget(target:CharityTarget):void {
    this.target = target;
  }
  
  modifyType(type:CharityType):void {
    this.type = type;
  }
  
}
