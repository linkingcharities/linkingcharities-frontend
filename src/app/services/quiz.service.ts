import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Question, Option, Result } from '../constants/data-types';
import { API_URL, IMAGE_URL } from '../constants/config';
import { Subject, Observable } from 'rxjs/Rx';
import { Charity_Type, Image_Hosting, Quiz_Description } from '../constants/data-types';

@Injectable()
export class QuizService {

  sample_data:string = '[ { "no":"1",\
    "question":"Choose an image that appeals to you.",\
    "options":[{"o":"'+IMAGE_URL+'/1a.png", "a":"2"},\
               {"o":"'+IMAGE_URL+'/1b.png", "a":"5"},\
               {"o":"'+IMAGE_URL+'/1c.png", "a":"9"},\
               {"o":"'+IMAGE_URL+'/1d.png", "a":"8"}]\
    },\
   { "no":"2",\
     "question":"How far would you like to extend a helping hand?",\
    "options":[{"o":"'+IMAGE_URL+'/2a.png", "a":"3"},\
               {"o":"'+IMAGE_URL+'/2b.png", "a":"4"}]\
    },\
    { "no":"3",\
      "question":"Which image invokes more sympathy?",\
      "options":[{"o":"'+IMAGE_URL+'/3a.png", "a":"a2"},\
                 {"o":"'+IMAGE_URL+'/3b.png", "a":"a3"}]\
    },\
    { "no":"4",\
      "question":"I would like to find a charity that helps...",\
      "options":[{"o":"'+IMAGE_URL+'/4a.png", "a":"a2"},\
                 {"o":"'+IMAGE_URL+'/4b.png", "a":"a4"}]\
    },\
    { "no":"5",\
      "question":"I would like to find a charity that does...",\
      "options":[{"o":"'+IMAGE_URL+'/5a.png", "a":"6"},\
                 {"o":"'+IMAGE_URL+'/5b.png", "a":"2"},\
                 {"o":"'+IMAGE_URL+'/5c.png", "a":"7"}]\
    },\
    { "no":"6",\
      "question":"I would prefer a charity that does...",\
      "options":[{"o":"'+IMAGE_URL+'/6a.png", "a":"a1"},\
                 {"o":"'+IMAGE_URL+'/6b.png", "a":"a0"}]\
    },\
    { "no":"7",\
      "question":"Which image is of concern?",\
      "options":[{"o":"'+IMAGE_URL+'/7a.png", "a":"a1"},\
                 {"o":"'+IMAGE_URL+'/7b.png", "a":"a3"}]\
    },\
    { "no":"8",\
      "question":"Which institution would you like to lend a helping hand to?",\
      "options":[{"o":"'+IMAGE_URL+'/8a.png", "a":"a6"},\
                 {"o":"'+IMAGE_URL+'/8b.png", "a":"a6"},\
                 {"o":"'+IMAGE_URL+'/8c.png", "a":"a0"}]\
    },\
    { "no":"9",\
      "question":"Which situation would you like to be in?",\
      "options":[{"o":"'+IMAGE_URL+'/9a.png", "a":"a5"},\
                 {"o":"'+IMAGE_URL+'/9b.png", "a":"a5"},\
                 {"o":"'+IMAGE_URL+'/9c.png", "a":"a6"},\
                 {"o":"'+IMAGE_URL+'/9d.png", "a":"a6"}]\
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
        result.links=["C"];
        break;
      case "a1" :
        result.title="Education";
        result.links=["E","S","RE"];
        break;
      case "a2" :
        result.title="Health";
        result.links=["H","D"];
        break;
      case "a3" :
        result.title="Community Development";
        result.links=["EC"];
        break;
      case "a4":
        result.title="Human Services";
        result.links=["HR","P","O"];
        break;
      case "a5":
        result.title="Animal Welfare & Environment";
        result.links=["AN","EN"];
        break;
      case "a6":
        result.title="General Charitable Purpose";
        result.links=["G","R","A","OT"];
        break;
    }

    result.link_types = [];
    result.description = Quiz_Description[choice];
    result.picture_link = IMAGE_URL + Image_Hosting[choice];

    for (var i = 0; i < result.links.length; i++) {
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