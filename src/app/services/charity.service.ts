import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Charity, CharitySearchQuery, DefaultType, DefaultTarget } from '../constants/data-types';
import { API_URL } from '../constants/config';
import { Subject } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class CharityService {
  
  constructor(private http:Http,
              private toasterService:ToasterService) {
  }
  
  private charitiesSource = new Subject<Charity[]>();
  charities$ = this.charitiesSource.asObservable();
  
  private charitySource = new Subject<Charity>();
  charity$ = this.charitySource.asObservable();
  
  prevQuery:CharitySearchQuery = {
    term: '',
    target: DefaultTarget,
    type: DefaultType
  };
  
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
        this.prevQuery = searchQuery;
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
  
  updateCharity(charity:Charity, charityID:number, username:string) {
    let data = {
      'username': username,
      'name': charity.name,
      'register_id': charity.register_id,
      'description': charity.description,
      'paypal': charity.paypal,
      'type': charity.type,
      'target': charity.target
    };
    this.http.patch(API_URL + '/update_charity', data, this.getOptions())
      .toPromise()
      .then((res:Response) => {
          console.log(res);
          this.getCharity(charityID);
          this.toasterService.pop('success', '', 'Charity update successful');
        }
      )
      .catch((err:Error) => {
        this.toasterService.pop('error', '', 'Charity update failed');
      });
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