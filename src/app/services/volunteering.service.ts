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
  opportunity$ = this.volunteerSource.asObservable();

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

  getOpportunity(id:number) {
    this.http.get(API_URL + '/volunteering?id=' + id, this.getOptions())
      .toPromise()
      .then((res:Response) => {
        let opportunity = res.json() as Opportunity;
        this.volunteerSource.next(opportunity);
      })
      .catch(this.handleError);
  }

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
