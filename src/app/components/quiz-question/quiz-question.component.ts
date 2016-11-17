import { Component, OnInit } from "@angular/core";
import { Question } from '../../constants/data-types';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})

export class QuizQuestionComponent implements OnInit {

  // @Input() question:Questions;
  question:string;
  options:string[] = [];
  result:string;
  
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
    // this.initializeQuiz();
  }

  ngOnInit():void {
    this.quizService.initializeQuiz();
  }

  ngOnDestroy() {
    this.questionSubscription.unsubscribe();
    this.optionsSubscription.unsubscribe();
  }

  nextQuestion(choice:number){
    this.quizService.calculateResult(choice);
    this.quizService.nextQuestion();
  }
}
