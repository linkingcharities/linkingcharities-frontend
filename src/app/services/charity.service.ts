import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Charity } from '../constants/data-types';
import { API_URL } from '../constants/config';

@Injectable()
export class CharityService {
  
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http:Http) {
  }
  
  getCharities():Promise<Charity[]> {
    return this.http.get(API_URL + '/charities')
      .toPromise()
      .then(function (response) {
        console.log(response.json() as Charity[]);
        return response.json() as Charity[]
      })
      .catch(this.handleError);
  }
  
  // getHero(id:number):Promise<Hero> {
  //   return this.getHeroes()
  //     .then(heroes => heroes.find(hero => hero.id === id));
  // }
  
  // delete(id:number):Promise<void> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  //
  // create(name:string):Promise<Hero> {
  //   return this.http
  //     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }
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