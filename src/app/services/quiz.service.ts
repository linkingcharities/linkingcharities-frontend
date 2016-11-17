import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Question } from '../constants/data-types';
import { API_URL } from '../constants/config';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class QuizService {
  
  constructor(private http:Http) {
  }
  
  private questionSource = new Subject<Question[]>();
  questions$ = this.questionSource.asObservable();
    
  private getOptions():RequestOptions {
    let headers:Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    let opts = new RequestOptions({headers: headers});
    opts.headers = headers;
    return opts;
  }
  
  getQuestions() {
    this.http.get(API_URL + '/questions', this.getOptions())
      .toPromise()
      .then((res:Response) => {
        let questions = res.json() as Question[];
        this.questionSource.next(questions);
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