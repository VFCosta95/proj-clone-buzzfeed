import { Component, OnInit } from '@angular/core';
import quizz_question from "../../../../src/assets/data/quizz-question.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{

  title = ''

  questions:any
  questionSelect:any

  answers:string[] = []
  answerSelect = ''

  questionIndex = 0
  questionMaxIndex = 0

  finished = false

  constructor(){

  }

  ngOnInit(): void {
      if(quizz_question){
        this.finished = false
        this.title = quizz_question.title

        this.questions = quizz_question.questions
        this.questionSelect = this.questions[ this.questionIndex ]

        this.questionIndex = 0
        this.questionMaxIndex = this.questions.length

        console.log(this.questionIndex)
        console.log(this.questionMaxIndex)
      }
  }

  Press(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1 

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelect = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.check(this.answers)
      this.finished = true
      this.answerSelect = quizz_question.results[finalAnswer as keyof 
        typeof quizz_question.results]
      
    }

  }

  async check(answers:string[]){
    
    const res = answers.reduce((previa, atual, index, arr) => {
      
      if(
        arr.filter(item => item === previa).length > 
        arr.filter(item => item === atual).length
        ){
          return previa
      } else {
          return atual
      }
    })

    return res
  }


}
