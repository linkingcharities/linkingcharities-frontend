import { Component } from '@angular/core';
import { CharityService } from '../../services/charity.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CharityType, CharityTypes, CharityTarget, CharityTargets, Charity } from '../../constants/data-types';


@Component({
  selector: 'charity-form-profile',
  templateUrl: './charity-form-profile.component.html',
  styleUrls: ['./charity-form-profile.component.css']
})

export class CharityFormProfileComponent {
  charityID:number = null;
  isCharity:boolean = false;
  charity:Charity;
  type:CharityType = null;
  target:CharityTarget = null;
  
  charityTargets:CharityTarget[] = CharityTargets;
  charityTypes:CharityType[] = CharityTypes;
  
  private subscription:any;
  
  constructor(private charityService:CharityService,
              private authService:AuthService,
              private router:Router) {
    this.subscription = this.charityService.charity$
      .subscribe(charity => {
        this.charity = charity;
        console.log(this.charity);
        this.target = this.charityTargets.filter(charityTarget => charityTarget.short == this.charity.target)[0];
        this.type = this.charityTypes.filter(charityType => charityType.short == this.charity.type)[0]
      });
  }
  
  ngOnInit() {
    this.charityID = parseInt(this.authService.getCharityID(), 10);
    this.charityService.getCharity(this.charityID);
  }
  
  onSubmit():void {
    // this.charityService.updateCharity(this.charity);
  }
  
  modifyTarget(target:CharityTarget):void {
    this.target = target;
  }
  
  modifyType(type:CharityType):void {
    this.type = type;
  }
  
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }
  
}
