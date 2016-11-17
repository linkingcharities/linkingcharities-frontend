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
   { "question":"Which picture shows a labrador?",\
    "option1":"labrador.png",\
     "option2":"beagle.png",\
      "option3":"poodle.png" },\
    { "question":"Which picture shows a meerkat?",\
     "option1":"meerkat.png",\
      "option2":"chipmunk.png",\
       "option3":"squirrel.png" }]';

  private questions:Question[];
  private count:number;
  private current_question:number = 0;

  constructor(private http:Http) {
  }
  
  // private questionsSource = new Subject<Question[]>();
  // questions$ = this.questionsSource.asObservable();

  //Create a resultSource as well and do the calculation here.

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
    //     this.questionSource.next(questions);
    //   })
    //   .catch(this.handleError);

    //for sample data
     let q = JSON.parse(this.sample_data) as Question[];
     this.questions = q;
     this.count = this.questions.length;
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
     }
     this.current_question++;

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