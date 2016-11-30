import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Opportunity } from "../../constants/data-types";
import { VolunteeringService } from "../../services/volunteering.service";

@Component({
    selector: 'volunteering_detail',
    templateUrl: './volunteering_detail.component.html',
    styleUrls: ['./volunteering_detail.component.css']
})

export class VolunteeringDetailComponent implements OnInit {
    opportunity: Opportunity;

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
            this.volunteeringService.getOpportunity(id);
        });
    }

    goBack():void {
        this.location.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
