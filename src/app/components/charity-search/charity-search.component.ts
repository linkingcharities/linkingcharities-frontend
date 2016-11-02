import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Charity } from '../../constants/data-types';
import { CharityService } from '../../services/charity.service';

@Component({
  selector: 'charity-search',
  templateUrl: 'charity-search.component.html',
  styleUrls: ['charity-search.component.css']
})

export class CharitySearchComponent implements OnInit {
  charities:Observable<Charity[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private charityService:CharityService,
              private router:Router) {
  }
  
  // Push a search term into the observable stream.
  search(term:string):void {
    this.searchTerms.next(term);
  }
  
  ngOnInit():void {
    this.charities = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.charityService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Charity[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Charity[]>([]);
      });
  }
  
  goToDetail(charity:Charity):void {
    let link = ['/detail', charity.id];
    this.router.navigate(link);
  }
}