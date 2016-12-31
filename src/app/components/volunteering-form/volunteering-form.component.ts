import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'volunteering-form',
    templateUrl: './volunteering-form.component.html',
    styleUrls: ['./volunteering-form.component.css']
})

export class VolunteeringFormComponent {
    name:string;
    description:string;
    start_date:string;
    end_date:string;
    url:string;

    constructor(private authService:AuthService) {
    }

    ngOnInit(): void{

    }

    onSubmit(): void {
        let data = {
            name: this.name,
            charity: localStorage.getItem("charityID"),
            description: this.description,
            start_date: this.start_date,
            end_date: this.end_date,
            url: this.url
        };
        console.log(data);
        this.authService.registerOpportunity(data);
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

    onDateRangeChanged(event: any): void {
        let range = event.formatted.split(" - ");
        if (range.length == 2) {
            this.start_date = range[0];
            this.end_date = range[1];
        }
    }

}
