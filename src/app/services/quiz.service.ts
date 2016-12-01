import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Question, Option, Result } from '../constants/data-types';
import { API_URL } from '../constants/config';
import { Subject, Observable } from 'rxjs/Rx';
import { Charity_Type } from '../constants/data-types';

@Injectable()
export class QuizService {

  sample_data:string = '[ { "no":"1",\
    "question":"Choose an image that appeals to you.",\
    "options":[{"o":"images/1a.jpg", "a":"2"},\
               {"o":"images/1b.jpg", "a":"5"},\
               {"o":"images/1c.jpg", "a":"9"},\
               {"o":"images/1d.jpg", "a":"8"}]\
    },\
   { "no":"2",\
     "question":"How far would you like to extend a helping hand?",\
    "options":[{"o":"images/2a.jpg", "a":"3"},\
               {"o":"images/2b.jpg", "a":"4"}]\
    },\
    { "no":"3",\
      "question":"Which image invokes more sympathy?",\
      "options":[{"o":"images/3a.jpg", "a":"a2"},\
                 {"o":"images/3b.jpg", "a":"a3"}]\
    },\
    { "no":"4",\
      "question":"I would like to find a charity that helps...",\
      "options":[{"o":"images/4a.jpg", "a":"a2"},\
                 {"o":"images/4b.jpg", "a":"a4"}]\
    },\
    { "no":"5",\
      "question":"I would like to find a charity that does...",\
      "options":[{"o":"images/5a.jpg", "a":"6"},\
                 {"o":"images/5b.jpg", "a":"2"},\
                 {"o":"images/5c.jpg", "a":"7"}]\
    },\
    { "no":"6",\
      "question":"I would prefer a charity that does...",\
      "options":[{"o":"images/6a.jpg", "a":"a1"},\
                 {"o":"images/6b.jpg", "a":"a0"}]\
    },\
    { "no":"7",\
      "question":"Which image is of concern?",\
      "options":[{"o":"images/7a.jpg", "a":"a1"},\
                 {"o":"images/7b.jpg", "a":"a3"}]\
    },\
    { "no":"8",\
      "question":"Which institution would you like to lend a helping hand to?",\
      "options":[{"o":"images/8a.jpg", "a":"a6"},\
                 {"o":"images/8b.jpg", "a":"a6"},\
                 {"o":"images/8c.jpg", "a":"a0"}]\
    },\
    { "no":"9",\
      "question":"Which situation would you like to be in?",\
      "options":[{"o":"images/9a.jpg", "a":"a5"},\
                 {"o":"images/9b.jpg", "a":"a5"},\
                 {"o":"images/9c.jpg", "a":"a6"},\
                 {"o":"images/9d.jpg", "a":"a6"}]\
    }]';

  private questions:Question[];

  constructor(private http:Http) {
  }

  private resultSource = new Subject<Result>();
  result$ = this.resultSource.asObservable();  

  private questionSource = new Subject<string>();
  question$ = this.questionSource.asObservable();

  private optionsSource = new Subject<Option[]>();
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
    //    this.current_question = 0;
    //    this.choices = "Result: ";
    //     this.nextQuestion();
    //   })
    //   .catch(this.handleError);

    //for sample data
     let q = JSON.parse(this.sample_data) as Question[];
     this.questions = q;
     this.nextQuestion("1"); //Start off with first question

  }

  nextQuestion(choice:string) {
    if(choice.charAt(0) === 'a'){
      this.questionSource.next(null);
      this.optionsSource.next(null);
      this.generateResult(choice);
    }else {
      let nextQuestion:number = parseInt(choice)-1;
      this.questionSource.next(this.questions[nextQuestion].question);
      let options: Option[] = this.questions[nextQuestion].options;
      this.optionsSource.next(options);
    } 
  }

  private generateResult(choice:string) {
    let result = new Result;
    //generate the cases
    switch (choice)
    {
      case "a0" :
        result.title="Arts & Cultural";
        result.picture_link="a0.png";
        result.description="a0";
        result.links=["C"];
        break;
      case "a1" :
        result.title="Education";
        result.picture_link="a1.png";
        result.description="a1";
        result.links=["E","S","RE"];
        break;
      case "a2" :
        result.title="Health";
        result.picture_link="a2.png";
        result.description="a2";
        result.links=["H","D"];
        break;
      case "a3" :
        result.title="Community Development";
        result.picture_link="a3.png";
        result.description="a3";
        result.links=["EC"];
        break;
      case "a4":
        result.title="Human Services";
        result.picture_link="a4.png";
        result.description="a4";
        result.links=["HR","P","O"];
        break;
      case "a5":
        result.title="Animal Welfare & Environment";
        result.picture_link="a5.png";
        result.description="a5";
        result.links=["AN,EN"];
        break;
      case "a6":
        result.title="General Charitable Purpose";
        result.picture_link="a6.png";
        result.description="a6";
        result.links=["G","R","A","OT"];
        break;
    }

    result.link_types = [];

    for (var i = 0; i < result.links.length; i++) {
        console.log(result.links[i]);
        console.log(Charity_Type[result.links[i]]);
        result.link_types.push(Charity_Type[result.links[i]]);

    }

    for (let test of result.link_types) {
      console.log(test);
    }

    this.resultSource.next(result);
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