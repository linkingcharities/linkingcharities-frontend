import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Charity } from '../constants/data-types';
import { API_URL } from '../constants/config';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class CharityService {
  
  constructor(private http:Http) {
  }
  
  private charitiesSource = new Subject<Charity[]>();
  charities$ = this.charitiesSource.asObservable();
  
  private charitySource = new Subject<Charity>();
  charity$ = this.charitySource.asObservable();
  
  private getOptions():RequestOptions {
    let headers:Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    let opts = new RequestOptions({headers: headers});
    opts.headers = headers;
    return opts;
  }
  
  getCharities() {
    this.http.get(API_URL + '/charities', this.getOptions())
      .toPromise()
      .then((res:Response) => {
        let charities = res.json() as Charity[];
        this.charitiesSource.next(charities);
      })
      .catch(this.handleError);
  }
  
  getCharity(id:number) {
    this.http.get(API_URL + '/charities', this.getOptions())
      .toPromise()
      .then((res:Response) => {
        let charities = res.json() as Charity[];
        this.charitySource.next(charities.find(charity => charity.id === id));
      })
      .catch(this.handleError);
  }
  
  // delete(id:number):Promise<void> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  //
  
  create(data:string):Promise<Charity> {
    return this.http
      .post(API_URL + '/charities', data, this.getOptions())
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  
  //
  // update(hero:Hero):Promise<Hero> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   console.log(url);
  //   return this.http
  //     .put(url, JSON.stringify(hero), {headers: this.headers})
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }
  //
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