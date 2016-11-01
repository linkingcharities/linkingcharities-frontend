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
  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}