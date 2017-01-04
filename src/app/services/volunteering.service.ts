import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Opportunity, VolunteeringSearchQuery } from '../constants/data-types';
import { API_URL } from '../constants/config';
import { Subject } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { Router } from '@angular/router';

@Injectable()
export class VolunteeringService {

  constructor(private http: Http,
              private toasterService: ToasterService,
              private router:Router) {
  }

  private volunteeringSource = new Subject<Opportunity[]>();
  opportunities$ = this.volunteeringSource.asObservable();

  private volunteerSource = new Subject<Opportunity>();
  opportunity$ = this.volunteerSource.asObservable();

  prevQuery: VolunteeringSearchQuery = {
    term: '',
    start_date: '',
    end_date: ''
  };

  private getOptions(): RequestOptions {
    let headers: Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    let opts = new RequestOptions({ headers: headers });
    opts.headers = headers;
    return opts;
  }

  getOpportunities() {
    this.http.get(API_URL + '/volunteering', this.getOptions())
      .toPromise()
      .then((res: Response) => {
      let opportunities = res.json() as Opportunity[];
      this.volunteeringSource.next(opportunities);
    })
      .catch(this.handleError);
  }

  getOpportunity(id: number, view_only: boolean) {
    this.http.get(API_URL + `/volunteering?id=${id}`, this.getOptions())
      .toPromise()
      .then((res: Response) => {
      let opportunity = res.json() as Opportunity;
      if (parseInt(localStorage.getItem("charityID")) !== opportunity[0]['charity'] && !view_only) {
          this.toasterService.pop('error','', 'Trying to access opportunity not created by you!');
          this.router.navigateByUrl('/update-volunteering');
      } else {
          this.volunteerSource.next(opportunity[0]);
      }
    })
      .catch(this.handleError);
  }

  getOpportunitiesForCharity(charity_id: number) {
    this.http.get(API_URL + `/volunteering?charity=${charity_id}`, this.getOptions())
      .toPromise()
      .then((res: Response) => {
      let opportunities = res.json() as Opportunity[];
      this.volunteeringSource.next(opportunities);
    }).catch(this.handleError);
  }


  registerOpportunity(data: any) {
    this.http.post(API_URL + '/volunteering', {
      name: data['name'],
      charity: data['charity'],
      description: data['description'],
      start_date: data['start_date'],
      end_date: data['end_date'],
      url: data['url']
    }).toPromise().then((res: Response) => {
      this.toasterService.pop('success', '', 'Opportunity Registered!');
      this.router.navigate(['/home']);
    }).catch((err: Error) => {
      this.toasterService.pop('error', '', 'Opportunity Registration Failed');
    });
  }

  updateOpportunity(opportunity: Opportunity, id: number) {
    let data = {
      'name': opportunity.name,
      'description': opportunity.description,
      'start_date': opportunity.start_date,
      'end_date': opportunity.end_date,
      'url': opportunity.url
    };
    this.http.patch(API_URL + `/volunteering/${id}`, data, this.getOptions())
      .toPromise()
      .then((res: Response) => {
      console.log(res);
      this.toasterService.pop('success', '', 'Volunteering Update Successful');
    }).catch((err: Error) => {
      this.toasterService.pop('error', '', 'Volunteering Update Failed');
    });
  }

  deleteOpportunity(id: number) {
    this.http.delete(API_URL + `/volunteering/${id}`, this.getOptions())
      .toPromise()
      .then((res: Response) => {
      console.log(res);
      this.toasterService.pop('success', '', `Delete of ${id} successful`);
    }).catch((err: Error) => {
      this.toasterService.pop('error', '', `Delete of ${id} unsuccessful`);
    });
  }

  search(searchQuery: VolunteeringSearchQuery) {
    const serverQuery = API_URL + '/volunteering?'
      + `start_date=${searchQuery.start_date}&`
      + `end_date=${searchQuery.end_date}`;

    return this.http.get(serverQuery, this.getOptions()).toPromise()
      .then((res: Response) => {
      let opportunities = res.json() as Opportunity[];
      let filtered = opportunities.filter(opportunity =>
        opportunity.name.toLowerCase().
          includes(searchQuery.term.toLowerCase()) ||
        opportunity.charity_name.toLowerCase().
          includes(searchQuery.term.toLowerCase()));
      this.volunteeringSource.next(filtered);
      this.prevQuery = searchQuery;
    }).catch(this.handleError);
  }

  // Error handliing
  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status}`;
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
  }
}
