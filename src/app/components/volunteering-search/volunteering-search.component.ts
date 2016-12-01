import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { VolunteeringService } from '../../services/volunteering.service';

@Component({
    selector: 'volunteering-search',
    templateUrl: 'volunteering-search.component.html',
    styleUrls: ['volunteering-search.component.css']
})

export class VolunteeringSearchComponent implements OnInit {

    constructor(private volunteeringService: VolunteeringService,
                private router:Router) {

    }

    ngOnInit():void {
        
    }
}
