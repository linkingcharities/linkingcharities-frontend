import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Opportunity } from '../constants/data-types';
import { API_URL } from '../constants/config';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class VolunteeringService {

  constructor(private http:Http) {
  }

  private volunteeringSource = new Subject<Opportunity[]>();
  opportunities$ = this.volunteeringSource.asObservable();

  private volunteerSource = new Subject<Opportunity>();
  opportunity$ = this.volunteeringSource.asObservable();

  private getOptions():RequestOptions {
    let headers:Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    let opts = new RequestOptions({headers: headers});
    opts.headers = headers;
    return opts;
  }

  getOpportunities() {
    this.http.get(API_URL + '/volunteering', this.getOptions())
      .toPromise()
      .then((res:Response) => {
        let opportunities = res.json() as Opportunity[];
        this.volunteeringSource.next(opportunities);
      })
      .catch(this.handleError);
  }

  /*getCharity(id:number) {
    this.http.get(API_URL + '/charities?id=' + id, this.getOptions())
      .toPromise()
      .then((res:Response) => {
        let charities = res.json() as Charity[];
        this.charitySource.next(charities[0]);
      })
      .catch(this.handleError);
  }

  search(searchQuery:CharitySearchQuery) {
    // This will work for now but obviously a filtered route is preferred going forward
    const serverQuery = API_URL + `/charities?`
      + `type=${searchQuery.type.short}&`
      + `target=${searchQuery.target.short}`;
    return this.http.get(serverQuery, this.getOptions())
      .toPromise()
      .then((res:Response) => {
        let charities = res.json() as Charity[];
        let filtered = charities.filter(charity => charity.name.toLowerCase().includes(searchQuery.term.toLowerCase()));
        this.charitiesSource.next(filtered);
      })
      .catch(this.handleError);
  }

  create(data:string):Promise<Charity> {
    return this.http
      .post(API_URL + '/volunteering', data, this.getOptions())
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }*/

  // Error handliing
  private handleError(error:Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg:string;
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
