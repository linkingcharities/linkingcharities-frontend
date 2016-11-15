import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Charity, CharityTarget, CharityTargets, CharityTypes, CharityType } from '../../constants/data-types';
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
  currentTarget:string = 'Target';
  currentType:string = 'Type';
  
  constructor(private charityService:CharityService,
              private router:Router) {
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
          this.charityService.search(term);
        }
        this.prevTerm = term;
      });
  }
  
  goToDetail(charity:Charity):void {
    let link = ['/detail', charity.id];
    this.router.navigate(link);
  }
}