import { Component, OnInit, ViewChild } from '@angular/core';
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
  private prevTerm: string = null;
  searchQuery: VolunteeringSearchQuery;
  private range: string = "";
  private startDate: string = "";
  private endDate: string = "";
  @ViewChild('MDRP') MDRP: any;

  constructor(private volunteeringService: VolunteeringService,
    private router: Router) {
    this.searchQuery = volunteeringService.prevQuery;
  }

  ngOnInit(): void {
    this.searchTerms.debounceTime(500).subscribe(term => {
      if (term != this.prevTerm) {
        this.searchQuery.term = term;
        this.volunteeringService.search(this.searchQuery);
      }
      this.prevTerm = term;
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  clear(): void {
    $('#searchBox').val("");
    this.search('');
    this.MDRP.removeBtnClicked();
    this.volunteeringService.search(this.searchQuery);
  }

  onDateRangeChanged(event: any): void {
    this.range = event.formatted.split(" - ");
    if (this.range.length > 1) {
      this.searchQuery.start_date = this.range[0];
      this.searchQuery.end_date = this.range[1];
    } else {
      this.searchQuery.start_date = "";
      this.searchQuery.end_date = "";
    }
    this.volunteeringService.search(this.searchQuery);
  }

  myDateRangePickerOptions = {
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
}
