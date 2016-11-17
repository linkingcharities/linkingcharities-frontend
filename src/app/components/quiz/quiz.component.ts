import { Component, ElementRef } from "@angular/core";
import { Question } from '../../constants/data-types';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizPageComponent  {

  //Sample data
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

  theHtmlString:string;

  constructor(private elementRef:ElementRef) {
    this.initializeQuiz();
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
        <div id="1" class="pix"><img src="'+questions[0].option1+'"></div>\
        <div id="2" class="pix"><img src="'+questions[0].option2+'"></div>\
        <div id="3" class="pix"><img src="'+questions[0].option3+'"></div>';

      var x = this.elementRef.nativeElement.querySelectorAll('.pix');
      console.log(x);
      console.log(x.length);

      // .addEventListener("click", function(){
      //     alert("HOLA");
      // });

      
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