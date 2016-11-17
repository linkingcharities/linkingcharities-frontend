import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Question } from '../constants/data-types';
import { API_URL } from '../constants/config';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class QuizService {
  

  sample_data:string = '[ { "question":"Which category would you like to extend a helping hand",\
   "option1":"https://cdn.meme.am/images/80x80/7727258.jpg",\
    "option2":"http://aromatherapy-courses.co.uk/wp-content/uploads/2013/04/Elderly-Care-80x80.jpg",\
     "option3":"http://cdn1.twinfinite.net/wp-content/uploads/2016/01/pikachu-80x80.png" },\
   { "question":"Which image appeals to you most?",\
    "option1":"http://aftlc.com/wp-content/uploads/2014/10/itc-activity-firstaid-80x80.jpg",\
     "option2":"http://ensuretech.com/wp-content/uploads/2011/07/healthcare-thumbnail-clinics.jpg",\
      "option3":"http://www.psypokes.com/dex/picdex/platinum_shiny_female/025_2.png" },\
    { "question":"Which do you think weights the most",\
     "option1":"https://thumb-tf.s3.envato.com/files/213731534/thumbnail.jpg",\
      "option2":"https://thebirthinginn.com/wp-content/uploads/2016/02/African-American-Newborn-Baby-450sq-80x80.jpg",\
       "option3":"http://media.cutimes.com/cutimes/article/2016/11/09/trump-crop-80x80.jpg" }]';

  private questions:Question[];
  private count:number;
  private current_question:number = 0;
  private choices:string;

  constructor(private http:Http) {
  }

  private resultSource = new Subject<string>();
  result$ = this.resultSource.asObservable();  

  private questionSource = new Subject<string>();
  question$ = this.questionSource.asObservable();

  private optionsSource = new Subject<string[]>();
  options$ = this.optionsSource.asObservable();
    
  private getOptions():RequestOptions {
    let headers:Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    let opts = new RequestOptions({headers: headers});
    opts.headers = headers;
    return opts;
  }
  
  initializeQuiz() {

    // this.http.get(API_URL + '/questions', this.getOptions())
    //   .toPromise()
    //   .then((res:Response) => {
    //     let q = res.json() as Question[];
    //     this.count = this.questions.length;
    //    this.choices = "Result: ";
    //     this.nextQuestion();
    //   })
    //   .catch(this.handleError);

    //for sample data
     let q = JSON.parse(this.sample_data) as Question[];
     this.questions = q;
     this.count = this.questions.length;
     this.choices = "Result: ";
     this.nextQuestion();

  }

  nextQuestion() {
     if (this.current_question<this.count) {
       this.questionSource.next(this.questions[this.current_question].question);

       let options: string[] = [this.questions[this.current_question].option1,
       this.questions[this.current_question].option2,
       this.questions[this.current_question].option3];

       this.optionsSource.next(options)
     } else {
       this.questionSource.next(null);
       this.optionsSource.next(null);
       this.resultSource.next(this.choices);
     }
     this.current_question++;
  }

  calculateResult(choice:number) {
    //TODO: Some calculations which redirects to a list of charities?
    console.log(choice);
    this.choices += choice;
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