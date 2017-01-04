import { Component } from '@angular/core';
import { VolunteeringService } from '../../services/volunteering.service';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'volunteering-form',
  templateUrl: './volunteering-form.component.html',
  styleUrls: ['../volunteering-update-list/volunteering-update-list.component.css']
})

export class VolunteeringFormComponent {
  name:string;
  description:string;
  start_date:string;
  end_date:string;
  url:string;

  constructor(private volunteeringService:VolunteeringService,
              private router:Router,
              private location:Location) {
  }

  ngOnInit():void {
      if (!localStorage.getItem("charity")) {
          this.router.navigate(['/home']);
      }
  }

  onSubmit():void {
    let data = {
      name: this.name,
      charity: localStorage.getItem("charityID"),
      description: this.description,
      start_date: this.start_date,
      end_date: this.end_date,
      url: this.url
    };
    this.volunteeringService.registerOpportunity(data);
    console.log("called");
  }

  private myDateRangePickerOptions = {
    clearBtnTxt: 'Clear Dates',
    beginDateBtnTxt: 'Begin Date',
    endDateBtnTxt: 'End Date',
    acceptBtnTxt: 'OK',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '100%',
    inline: false,
    selectionTxtFontSize: '15px',
    alignSelectorRight: false,
    indicateInvalidDateRange: true,
    showDateRangeFormatPlaceholder: false,
    showClearBtn: false
  };

  onDateRangeChanged(event:any):void {
    let range = event.formatted.split(" - ");
    if (range.length == 2) {
      this.start_date = range[0];
      this.end_date = range[1];
    }
  }

  goBack():void {
      this.router.navigateByUrl('/home');
  }

}
