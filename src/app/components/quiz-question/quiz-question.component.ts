import { Component, OnInit } from "@angular/core";
import { Question, Option, Result } from '../../constants/data-types';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})

export class QuizQuestionComponent implements OnInit {

  // @Input() question:Questions;
  question:string;
  options:Option[] = [];
  result:Result;
  displayResult:boolean = false;
  questionOpacity:any = 1;
  
  private questionSubscription:any;
  private optionsSubscription:any;
  private resultSubscription:any;

  constructor(private quizService:QuizService) {
    this.questionSubscription = this.quizService.question$
      .subscribe(question => {
        this.question = question;
      });

    this.optionsSubscription = this.quizService.options$
      .subscribe(options => {
        this.options = options;
      });

    this.resultSubscription = this.quizService.result$
      .subscribe(result => {
        this.result = result;
      });    
  }

  ngOnInit():void {
    this.quizService.initializeQuiz();
  }

  ngOnDestroy() {
    this.questionSubscription.unsubscribe();
    this.optionsSubscription.unsubscribe();
    this.resultSubscription.unsubscribe();
  }

  nextQuestion(choice:string){
    this.questionOpacity = 0;
    setTimeout(() =>{
      this.quizService.nextQuestion(choice);
      this.questionOpacity = 1;
    }, 1000
    );
  }
}
