import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {
    Opportunity,
    VolunteeringSearchQuery
} from '../../constants/data-types'
import { VolunteeringService } from '../../services/volunteering.service';

@Component({
    selector: 'volunteering-search',
    templateUrl: 'volunteering-search.component.html',
    styleUrls: ['volunteering-search.component.css']
})

export class VolunteeringSearchComponent implements OnInit {
    private searchTerms = new Subject<string>();
    private prevTerm:string = null;
    searchQuery:VolunteeringSearchQuery;

    constructor(private volunteeringService: VolunteeringService,
                private router:Router) {
      this.searchQuery = volunteeringService.prevQuery;
    }

    ngOnInit():void {
        this.searchTerms.debounceTime(500).subscribe(term => {
            if (term != this.prevTerm) {
                this.searchQuery.term = term;
                this.volunteeringService.search(this.searchQuery);
            }
            this.prevTerm = term;
        });
    }

    search(term:string):void {
        this.searchTerms.next(term);
    }
}
