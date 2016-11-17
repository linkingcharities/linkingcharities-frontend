import { Component } from "@angular/core";
import { Question } from '../../constants/data-types';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizPageComponent  {

  //Sample data
  sample_data:string = '[ { "question":"Which category would you like to extend a helping hand", "option1":"lion.png", "option2":"tiger.png", "option3":"cheetah.png" },\
   { "question":"Which picture shows a labrador?", "option1":"labrador.png", "option2":"beagle.png", "option3":"poodle.png" },\
    { "question":"Which picture shows a meerkat?", "option1":"meerkat.png", "option2":"chipmunk.png", "option3":"squirrel.png" }]';

  constructor() {
  }


  initializeQuiz() {
      var temp = JSON.parse(this.sample_data);
      let questions = temp as Question[];

      console.log(questions.length);

      console.log(questions[0]);


      var questionNumber=0;
      // var questionBank=new Array();
      // var stage="#game1";
      var stage2=new Object;
      var questionLock=false;
      var numberOfQuestions:number;
      var score=0;

      // for(let i in { 
      //   questionBank[i]=new Array;
      //   questionBank[i][0]=this.output.quizlist[i].question;
      //   questionBank[i][1]=this.output.quizlist[i].option1;
      //   questionBank[i][2]=this.output.quizlist[i].option2;
      //   questionBank[i][3]=this.output.quizlist[i].option3;
      // }

      // numberOfQuestions = questionBank.length; 
      // alert(questionBank);


      this.theHtmlString = '<div class = "questionText">' + questions[0].question + '</div>\
        <div id="1" class="pix"><img src="img/'+questions[0].option1+'"></div>\
        <div id="2" class="pix"><img src="img/'+questions[0].option2+'"></div>\
        <div id="3" class="pix"><img src="img/'+questions[0].option3+'"></div>';


      // $('#game1').append('<div class = "questionText">' + questions[0].question + '</div>\
      //   <div id="1" class="pix"><img src="img/'+questions[0].option1+'"></div>\
      //   <div id="2" class="pix"><img src="img/'+questions[0].option2+'"></div>\
      //   <div id="3" class="pix"><img src="img/'+questions[0].option3+'"></div>');
      
      // $('.pix').click(function(){
      //   if (questionLock==false) { 
      //     questionLock=true; 
      //     //correct answer
      //     if (this.id==1) {
      //     $(stage).append('<div class="feedback1">1 selected</div>');
      //     }
      //     //wrong answer 
      //     if (this.id==2) {
      //     $(stage).append('<div class="feedback2">2 selected</div>');
      //     }
      //     //setTimeout(function(){changeQuestion()},1000); 
      // }})

  }
}