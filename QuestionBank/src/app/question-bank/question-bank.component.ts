import { AfterContentInit, Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question';
import { GroupData } from '../data/group-data';
import { CustomPipeStatusComponent } from '../custom-pipe-status/custom-pipe-status.component';
import { StatusQuestionData } from '../data/status-question-data';
import { ActivatedRoute } from '@angular/router';
import { FunctionStatus } from '../data/function-pop-by-status-data';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Router } from 'express';


@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent implements OnInit, AfterContentInit{
  questions: Question[] = []
  groupdata = GroupData
  statusQuestionData = StatusQuestionData
  currentIndexStatus = -1

  isCheckDraft = false
  isCheckApprove = false
  isCheckSend = false
  isCheckStopApprove = false

  params = ''

  //list arr of checkbox Filter
  listStatusFilter:number[] = []

  //list item filter by checkbox
  listItemFilterByCheckbox:any[] = []

  listFunctionStatus = FunctionStatus
  listChildFunctionStatus:any = []
  listQuestionDataFilter:any[] = []

  listItemChecked:any[] = []

  //handle pagintion
  listNumberPage:number[] = []
  listNumberPageFilter:number[] =[]
  currentNumberPage = 5
  currenPage = 1 
  numberShowItemPage = 5

  //handle checkAll
  isCheckedAll: boolean = false; 

  //handle search
  searchQuery: string = ""

  //loading
  isLoading: boolean = false;

  //popDelete
  isPopDelete: boolean = false
  listItemDelete: any = []

  constructor(private questionService: QuestionService, private route: ActivatedRoute){}

  async ngOnInit(): Promise<void> {
    try{
      this.isLoading = false
      await this.getQuestions();
      this.listItemFilterByCheckbox = this.questions;
      this.handleFilterData();
      this.resetFilter();
    }finally{
      this.isLoading = false
    }

  }
  
  async getQuestions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.questionService.getQuestions().subscribe(
        questions => {
          this.questions = questions;
          this.filterQuestions();
          resolve();
        },
        error => {
          reject(error);
        }
      );
    });
  }
  

  ngAfterContentInit(): void {
    this.handlePagination(this.numberShowItemPage, this.listQuestionDataFilter.length);
    this.handleShowItemQuestion(this.numberShowItemPage, this.listQuestionDataFilter, this.currenPage)
  }

  handleDeleteItem():void{

  }

  // getQuestions():void{
  //   this.questionService.getQuestions().subscribe(
  //     questions => {
  //       this.questions = questions,
  //       this.filterQuestions();
  //     }
  //   )
  // }

  filterQuestions(): void {
    if (!this.searchQuery.trim() && this.listStatusFilter.length === 0) {
      this.listQuestionDataFilter = this.questions;
      return;
    }
    let filteredBySearch = this.listQuestionDataFilter;
    if (this.searchQuery.trim()) {
      filteredBySearch = this.questions.filter(question =>
        question.question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      );
    }
  
    let filteredByStatus = filteredBySearch;
    if (this.listStatusFilter.length > 0) {
      filteredByStatus = filteredBySearch.filter(question =>
        this.listStatusFilter.includes(question.status)
      );
    }
  
    this.listQuestionDataFilter = filteredByStatus;
  }
  
  

  handleFilterData(): void {
    if( this.isCheckDraft == false && this.isCheckApprove == false && this.isCheckSend == false && this.isCheckStopApprove == false){
      this.listItemFilterByCheckbox = this.questions
      this.listQuestionDataFilter = this.listItemFilterByCheckbox
      return
    }else{
      this.listItemFilterByCheckbox = this.questions.filter(child => {
        return this.listStatusFilter.includes(child.status);
    });
    this.listQuestionDataFilter = this.listItemFilterByCheckbox
    }
}


  handleSetArrayStatus(item: number):void{
    let indexToRemove = -1;
    this.listStatusFilter.forEach((element, i) => {
        if (element === item) {
            indexToRemove = i;
        }
    });
    if (indexToRemove !== -1) {
        this.listStatusFilter.splice(indexToRemove, 1);
    } else {
        this.listStatusFilter.push(item);
    }
  }

  handlCheckItem(item:string):void{
    
    switch(item){
      case 'draft':
        this.isCheckDraft = !this.isCheckDraft
        this.handleSetArrayStatus(0);
        this.handleSetArrayStatus(4);
        this.handleFilterData();
        this.getValueNumberPage(this.numberShowItemPage)
        // this.handlecheckAll()
        break
      case 'approve':
        this.isCheckApprove = !this.isCheckApprove
        this.handleSetArrayStatus(2);
        this.handleFilterData();
        this.getValueNumberPage(this.numberShowItemPage)
        break
      case 'send':
        this.isCheckSend = !this.isCheckSend
        this.handleSetArrayStatus(1);
        this.handleFilterData();
        this.getValueNumberPage(this.numberShowItemPage)
        break
      case 'stopApprove':
        this.isCheckStopApprove = !this.isCheckStopApprove
        this.handleSetArrayStatus(3);
        this.handleFilterData();
        this.getValueNumberPage(this.numberShowItemPage)
        break
    }
  }

  resetFilter():void{
    this.isCheckDraft = false
    this.isCheckApprove = false
    this.isCheckSend = false
    this.isCheckStopApprove = false
    this.searchQuery =''
    this.listStatusFilter = []
    this
    .currenPage = 1
    this.handlCheckItem('draft')
    this.handleFilterData();
    this.getValueNumberPage(this.numberShowItemPage)
  }


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

  handleCheckboxChange() {
    if (this.isCheckedAll) {
        this.isCheckedAll = false;
        this.listItemChecked.splice( (this.currenPage - 1) * this.numberShowItemPage, this.numberShowItemPage * this.currenPage);
    } else {
        this.isCheckedAll = true;
        for (let i = (this.currenPage - 1) * this.numberShowItemPage; i < this.numberShowItemPage * this.currenPage; i++) {
            if (i >= this.listItemFilterByCheckbox.length) {
                break;
            }
            if(!this.listItemChecked.includes(this.listItemFilterByCheckbox[i])){
              this.listItemChecked.push(this.listItemFilterByCheckbox[i]);
            }

        }
    }
}

  handlecheckAll() {
      for (let i = (this.currenPage - 1) * this.numberShowItemPage; i < this.numberShowItemPage * this.currenPage; i++) {
          if (i >= this.listItemFilterByCheckbox.length) {
              break;
          }
          if (!this.listItemChecked.includes(this.listItemFilterByCheckbox[i])) {
              this.isCheckedAll = false;
              return;
          }
      }
      this.isCheckedAll = true;
  }

handleAddItemChecked(item: any): void {
    let indexToRemove = -1;
    this.listItemChecked.forEach((element, i) => {
        if (element.id === item.id) {
            indexToRemove = i;
        }
    });
    if (indexToRemove !== -1) {
        this.listItemChecked.splice(indexToRemove, 1);
        this.handlecheckAll();
    } else {
        this.listItemChecked.push(item);
    }
    this.handlecheckAll()
}


  hanldeChangeStatusPopfunction(index:number, status:number):void{
    if(this.currentIndexStatus == index){
      this.currentIndexStatus = -1
    }else{
      this.currentIndexStatus = index
    }
    this.listChildFunctionStatus = this.listFunctionStatus[status].function
  }

  getValueNumberPage(numberPage: any):void{
   
    this.numberShowItemPage = Number(numberPage)
    if(this.currenPage > this.numberShowItemPage){
      this.currenPage = 1
    }
    this.handlePagination(numberPage, this.listItemFilterByCheckbox.length);
    this.handleShowItemQuestion(this.numberShowItemPage, this.listItemFilterByCheckbox, this.currenPage)
  }

  getValueCurrentPage(value:number):void{
    this.currenPage = value
    this.handleShowItemQuestion(this.numberShowItemPage, this.listItemFilterByCheckbox, this.currenPage)
    this.handlecheckAll()
  }

  handlePagination(currentNumberPage: number, numberItem: number): void {
    this.listNumberPage = []
    this.currentNumberPage = Math.ceil(numberItem / currentNumberPage);
    for(let i = 0; i < this.currentNumberPage; i++){
      this.listNumberPage.push(i + 1)
    }
  }

  handleShowItemQuestion(numberPage: number, data: any[], currentPage: number): void {
    this.listQuestionDataFilter = data.filter((item: any, index: number) => {
        const startIndex = (currentPage - 1) * numberPage;
        const endIndex = currentPage * numberPage - 1;
        return index >= startIndex && index <= endIndex;
    });
    
}

  handleNextCurrentPage():void{
    if(this.currenPage >= this.currentNumberPage){
      return
    }
    this.currenPage += 1
    this.getValueCurrentPage(this.currenPage)
    this.generatePageNumbers()
    this.handlecheckAll()
  }

  handlePreCurrentPage():void{
    if(this.currenPage <= 1){
      return
    }
    this.currenPage -=1
    this.getValueCurrentPage(this.currenPage)
    this.handlecheckAll()
  }

  handleFirstPage():void{
    if(this.currenPage == 1){
      return
    }
    this.currenPage = 1
    this.getValueCurrentPage(this.currenPage)
    this.handlecheckAll()
  }

  handleLastPage():void{
    if(this.currenPage == this.currentNumberPage){
      return
    }
    this.currenPage = this.currentNumberPage
    this.getValueCurrentPage(this.currenPage)
    this.handlecheckAll()
  }

  generatePageNumbers(): void {
    // this.listNumberPage
    // this.listNumberPageFilter

    // if(this.currenPage >= 3){
    //   this.listNumberPageFilter.push(this.currenPage - 1, this.currenPage, this.currenPage + 1)
    // }
  }


  handleChangeStatus(question: Question, status: number, fun: number):void{
    switch(fun){
      case 0:
        console.log("Xem chi tiết!");
        break
      case 1:
        console.log("Chỉnh sửa");
        break
      case 2:
        if(this.checkTruthyData(question) == true){
          const questionUpdateSend = {...question}
          questionUpdateSend.status = 1
          this.updateStatus(questionUpdateSend)
        }else{
          alert("Phai day du thong tin")
        }
        break
      case 3:
        if(this.checkTruthyData(question) == true){
          const questionUpdateApprove = {...question}
          questionUpdateApprove.status = 2
          this.updateStatus(questionUpdateApprove)
        }
        break
      case 4:
        if(this.checkTruthyData(question) == true){
          const questionUpdateStopVision = {...question}
          questionUpdateStopVision.status = 3
          this.updateStatus(questionUpdateStopVision)
        }
        break
      case 5:
        if(this.checkTruthyData(question) == true){
          const questionUpdateReturn = {...question}
          questionUpdateReturn.status = 4
          this.updateStatus(questionUpdateReturn)
        }
        break
      case 6:{
        const idQuestionDelete = question.id
        this.deleteQuestion(idQuestionDelete)
      }
    
    } 
  }

  handleSearchByEnter(event: any) {
    if (event.keyCode === 13) {
      this.filterQuestions();
    }
  }

  checkTruthyData(data:Question):any{
    if(!data.idQues || data.group == null || data.status == null || !data.time || data.type == null){
      console.log(false);
      return false
    }else{
      return true
    }
  }

  async refreshData() {
    try {
        this.isLoading = true; 
        await this.getQuestions(); 
        this.listItemFilterByCheckbox = this.questions;
        this.handleFilterData();
    } finally {
        this.isLoading = false;
    }
}

  
deleteQuestion(id:number):void{
  this.questionService.deleteQuestion(id).subscribe(() => this.refreshData())
}

  updateStatus(question: Question): void {
    this.questionService.updateStatus(question).subscribe(() => this.refreshData())
  }
  
}
