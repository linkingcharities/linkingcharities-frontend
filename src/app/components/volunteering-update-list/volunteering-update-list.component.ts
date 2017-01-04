import { Component } from '@angular/core';
import { VolunteeringService } from '../../services/volunteering.service';
import { Opportunity } from '../../constants/data-types';


@Component({
  selector: 'volunteering-update-list',
  templateUrl: './volunteering-update-list.component.html',
  styleUrls: ['./volunteering-update-list.component.css']
})

export class VolunteeringUpdateListComponent {

    opportunities:Opportunity[] = null;

    private subscription:any;

    constructor(private volunteeringService:VolunteeringService) {
        this.subscription = this.volunteeringService.opportunities$
          .subscribe(opportunities => {
              this.opportunities = opportunities;
         });
    }

    ngOnInit() {
        this.volunteeringService.getOpportunitiesForCharity(parseInt(localStorage.getItem("charityID")));
    }

    onDelete(id:number):void {
        if (confirm("Are you sure you wish to delete this?")) {
            this.volunteeringService.deleteOpportunity(id);
        }
    }


}
