import { Component } from '@angular/core';
import { VolunteeringService } from '../../services/volunteering.service';
import { Opportunity } from '../../constants/data-types';

@Component({
    selector: 'volunteering-update-form',
    templateUrl: './volunteering-update-form.component.html',
    styleUrls: ['./volunteering-update-form.component.css']
})

export class VolunteeringUpdateFormComponent {
    opportunityID:number = null;
    opportunity:Opportunity;

    private subscription:any;

    constructor(private volunteeringService:VolunteeringService) {
        this.subscription = this.volunteeringService.opportunity$
          .subscribe(opportunity => {
              this.opportunity = opportunity;
          });
    }

    ngOnInit() {

    }

    onSubmit():void {
        this.volunteeringService.updateOpportunity(this.opportunity, this.opportunityID);
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
        //this.start_date = range[0];
        //this.end_date = range[1];
      }
    }
}
