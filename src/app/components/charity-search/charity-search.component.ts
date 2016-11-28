import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {
  Charity,
  CharityTarget,
  CharityTargets,
  CharityTypes,
  CharityType,
  CharitySearchQuery,
  DefaultTarget,
  DefaultType
} from '../../constants/data-types';
import { CharityService } from '../../services/charity.service';

@Component({
  selector: 'charity-search',
  templateUrl: 'charity-search.component.html',
  styleUrls: ['charity-search.component.css']
})

export class CharitySearchComponent implements OnInit {
  private searchTerms = new Subject<string>();
  private prevTerm:string = null;
  charityTargets:CharityTarget[] = CharityTargets;
  charityTypes:CharityType[] = CharityTypes;
  searchQuery:CharitySearchQuery;
  
  constructor(private charityService:CharityService,
              private router:Router) {
    this.searchQuery = charityService.prevQuery;
  }
  
  // Push a search term into the observable stream.
  search(term:string):void {
    this.searchTerms.next(term);
  }
  
  ngOnInit():void {
    this.searchTerms
      .debounceTime(500)
      .subscribe(term => {
        if (term != this.prevTerm) {
          this.searchQuery.term = term;
          this.charityService.search(this.searchQuery);
        }
        this.prevTerm = term;
      });
  }
  
  goToDetail(charity:Charity):void {
    let link = ['/detail', charity.id];
    this.router.navigate(link);
  }
  
  clear(field:string):void {
    if (field == 'target') {
      this.searchQuery.target = DefaultTarget;
    }
    if (field == 'type') {
      this.searchQuery.type = DefaultType;
    }
    this.charityService.search(this.searchQuery);
  }
  
  modifyTarget(target:CharityTarget):void {
    this.searchQuery.target = target;
    this.charityService.search(this.searchQuery);
  }
  
  modifyType(type:CharityType):void {
    this.searchQuery.type = type;
    this.charityService.search(this.searchQuery);
  }
}