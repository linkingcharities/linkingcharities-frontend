import { Component, OnInit } from "@angular/core";
import { Question } from '../../constants/data-types';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizPageComponent implements OnInit{

  startQuiz:boolean;
  quizOpacity:any = 1;


  constructor() {
  }

  begin():void {
    this.quizOpacity = 0;
    setTimeout(() =>{
      this.startQuiz = true;
      this.quizOpacity = 1;
    }, 700
    );
  }

  ngOnInit():void {
    this.startQuiz = false;
  }
}