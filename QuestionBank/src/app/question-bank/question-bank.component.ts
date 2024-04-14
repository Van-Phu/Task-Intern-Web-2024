import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question';
import { GroupData } from '../data/group-data';
import { CustomPipeStatusComponent } from '../custom-pipe-status/custom-pipe-status.component';
import { StatusQuestionData } from '../data/status-question-data';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent implements OnInit{
  questions: Question[] = []
  groupdata = GroupData
  statusQuestionData = StatusQuestionData
  currentIndexStatus = -1

  constructor(private questionService: QuestionService){}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions():void{
    this.questionService.getQuestions().subscribe(questions => this.questions = questions)
  }


  //get name status and group by id
  getNameById(id: number, data: any): string {
    let name = '';
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            name = data[i].name;
            break;
        }
    }
    return name;
  }

  hanldeChangeStatusPopfunction(index:number):void{
    if(this.currentIndexStatus == index){
      this.currentIndexStatus = -1
    }else{
      this.currentIndexStatus = index
    }
    
  }

}
