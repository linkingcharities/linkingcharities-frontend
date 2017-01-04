import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Charity, Opportunity } from "../../constants/data-types";
import { VolunteeringService } from "../../services/volunteering.service";

@Component({
    selector: 'volunteering-detail',
    templateUrl: './volunteering-detail.component.html',
    styleUrls: ['./volunteering-detail.component.css']
})

export class VolunteeringDetailComponent implements OnInit {
    opportunity: Opportunity;
    charity: Charity;

    private subscription:any;

    constructor(private volunteeringService:VolunteeringService,
                private route:ActivatedRoute,
                private location:Location) {
        this.subscription = this.volunteeringService.opportunity$
            .subscribe(opportunity => {
                this.opportunity = opportunity;
            });
    }

    ngOnInit():void {
        this.route.params.forEach((params:Params) => {
            let id = +params['id'];
            this.volunteeringService.getOpportunity(id, true);
        });
    }

    goBack():void {
        this.location.back();
    }

    goToURL():void {
        window.location.href='http://' + this.opportunity.url;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
