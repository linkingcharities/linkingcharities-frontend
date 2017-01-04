import { Component} from '@angular/core';
import { VolunteeringService } from '../../services/volunteering.service';
import { Opportunity } from '../../constants/data-types';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'volunteering-update-form',
  templateUrl: './volunteering-update-form.component.html',
  styleUrls: ['../volunteering-update-list/volunteering-update-list.component.css']
})

export class VolunteeringUpdateFormComponent {
  opportunity: Opportunity;

  private subscription: any;

  constructor(private volunteeringService: VolunteeringService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    this.subscription = this.volunteeringService.opportunity$
      .subscribe(opportunity => {
      this.opportunity = opportunity;
    });
  }

  ngOnInit() {
    if (!localStorage.getItem("charity")) {
      this.router.navigate(['/home']);
    } else {
      this.route.params.forEach((params: Params) => {
        let id = params['id'];
        this.volunteeringService.getOpportunity(id, false);
      });
    }
  }

  onSubmit(): void {
    this.volunteeringService.updateOpportunity(this.opportunity, this.opportunity.id);
    this.router.navigateByUrl('update-volunteering');
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
      this.opportunity.start_date = range[0];
      this.opportunity.end_date = range[1];
    }
  }

  goBack(): void {
    this.location.back();
  }
}
