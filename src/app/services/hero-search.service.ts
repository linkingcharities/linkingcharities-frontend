import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Hero } from '../constants/data-types';
import { API_URL } from '../constants/config';

@Injectable()
export class HeroSearchService {
  private url = API_URL;
  
  constructor(private http:Http) {
  }
  
  search(term:string):Observable<Hero[]> {
    return this.http
      .get(this.url + `/?name=${term}`)
      .map((r:Response) => r.json().data as Hero[]);
  }
}