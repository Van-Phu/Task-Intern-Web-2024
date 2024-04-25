  import { AfterContentInit, Component, OnInit, HostListener,ViewChild, ElementRef, OnDestroy } from '@angular/core';
  import { QuestionService } from '../question.service';
  import { Question } from '../question';
  import { GroupData } from '../data/group-data';
  import { CustomPipeStatusComponent } from '../custom-pipe-status/custom-pipe-status.component';
  import { StatusQuestionData } from '../data/status-question-data';
  import { ActivatedRoute } from '@angular/router';
  import { FunctionStatus } from '../data/function-pop-by-status-data';
  import { faL } from '@fortawesome/free-solid-svg-icons';
  import { Router } from 'express';
  import { MyInMemoryDataService } from '../in-memory-data.service';
  import { group, log } from 'console';
  import { FormGroup, FormControl, FormsModule, ControlValueAccessor } from '@angular/forms';
  import { TypeOfQuestion } from '../data/typeOfQuestion';
  import { GratingMethod } from '../data/gratingMethod';

  @Component({
    selector: 'app-question-bank',
    templateUrl: './question-bank.component.html',
    styleUrl: './question-bank.component.scss'
  })
  export class QuestionBankComponent implements OnInit, AfterContentInit, OnDestroy{

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
    // listCurrentItem: any[] = []

    //handle pagintion
    listNumberPage:number[] = []
    listNumberPageFilter:number[] =[]
    currentNumberPage = 5
    currenPage = 1 
    numberShowItemPage = 5
    listPageItemShow:number[] = []
    listItemIndexPage: any[] =[]
    startIndex:number = 0
    endIndex:number = 4
    phasePage = 0
    isShowStartThreeDot: boolean = false
    isShowEndthreeDot:boolean = true

    //handle checkAll
    isCheckedAll: boolean = false; 

    //handle search
    searchQuery: string = ""

    //loading
    isLoading: boolean = false;

    //popDelete
    isPopDelete: boolean = false
    listItemDelete: any = []
    itemDelete: number = -1
    titleDelete: string = ""

    //list function item
    listItemFunction: any[] = []
    isNotFoundItem: boolean = false

    //handle popupChecked
    isPopChecked:boolean = false

    //localStorage
    db:any = []

    //popToast
    isPopToast: boolean = false
    statusMessage: boolean = true
    message: string = ''
    listStatusMessage: any[] = []

    //sidebar
    sidebarVisible:boolean = false;
    showFiller = false
    testNumber= 0;
    idItemUpdate = -1

    vari: any = '';

    //form
    @ViewChild('firstInput') firstInput!: ElementRef;
    typeOfQuestions = TypeOfQuestion
    groupData = GroupData
    gratingMethod = GratingMethod
    statusQuestons = StatusQuestionData
    isDisabledMethod: number = 0; 
    isDisabledMethodtype: boolean = true;
    isDisabledMethodGrading: boolean = true;
    questionChoose: any = {}

    profileQuestion = new FormGroup({
      nameQuestion: new FormControl(''),
      idQues: new FormControl(''),
      group: new FormControl(''),
      gradingMethod: new FormControl(),
      type: new FormControl(),
      time: new FormControl(30),
      status: new FormControl(this.statusQuestons[0].id),
      selectedDate: new FormControl('')
  });



  isGroupNotNull():void {
    if(this.profileQuestion.get('group')?.value != ''){
      this.isDisabledMethodtype = false
    }else{
      this.isDisabledMethodtype = true
    }
  }

  isTypeNotNull():void{
    if(this.profileQuestion.get('type')?.value == 0){
      this.isDisabledMethodGrading = false
    }else{
      this.isDisabledMethodGrading = true
    }
  }
  
    

    constructor(private questionService: QuestionService, private route: ActivatedRoute, private inMemoryDataService: MyInMemoryDataService){}

    async ngOnInit(): Promise<void> {
      try{
        this.db = this.inMemoryDataService.createDb();
        this.inMemoryDataService.putDb({ collectionName: 'questions', collection: this.db.questions });
        this.isLoading = true
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

    showItem():void{
      console.log(this.profileQuestion.get('type')?.value);
    }

    ngAfterContentInit(): void {
      this.handlePagination(this.numberShowItemPage, this.listQuestionDataFilter.length);
      this.handleShowItemQuestion(this.numberShowItemPage, this.listQuestionDataFilter, this.currenPage)

    }

    closeSidbar(){
      // console.log(this.selectedDate);
      this.sidebarVisible = false
    }

    openSideBar(){
      this.sidebarVisible = true
    }

    openSidebarAdd() {
      this.profileQuestion.enable()
      this.isDisabledMethod = 0;
      this.sidebarVisible = true;
      this.profileQuestion.patchValue({
        nameQuestion: '',
        idQues: '',
        group: '',
        gradingMethod: '',
        type: '',
        time: 30,
        status: this.statusQuestons[0].id
      });
      setTimeout(() => { 
        this.firstInput.nativeElement.focus();
      });
    }
    

    openSidebarByUpdate(question: Question){
      this.profileQuestion.enable()
      this.isDisabledMethod = 1
      this.idItemUpdate = question.id
      this.profileQuestion.patchValue({
        nameQuestion: question.question,
        idQues: String(question.idQues),
        group: String(question.group),
        gradingMethod: String(question.gradingMethod),
        type: String(question.type),
        time: question.time,
        status: question.status
      });
      setTimeout(() => { 
        this.firstInput.nativeElement.focus();
      });
      this.isGroupNotNull()
    }

    openSidebarByDetail(question: Question){
      this.profileQuestion.disable()
      this.isDisabledMethod = 2
      this.idItemUpdate = question.id
      this.profileQuestion.patchValue({
        nameQuestion: question.question,
        idQues: String(question.idQues),
        group: String(question.group),
        gradingMethod: String(question.gradingMethod),
        type: String(question.type),
        time: question.time,
        status: question.status
      });
      setTimeout(() => { 
        this.firstInput.nativeElement.focus();
      });

    }

    handleToast(message: string, status: boolean): void {
      this.statusMessage = status;
      this.message = message;
      this.isPopToast = true;
      setTimeout(() => {
        this.isPopToast = false;
      }, 2000);
  }


    getItemFunction(): void {
      this.listItemFunction = []
      this.listItemChecked.forEach(element => {
          if (!this.listItemFunction.some(item => item.id === element.id)) {
              const functionsToAdd = this.listFunctionStatus[element.status].function.filter(func =>
                  !this.listItemFunction.some(item => item.id === func.id)
              );
              this.listItemFunction.push(...functionsToAdd);
          }
      });
      
      this.listItemFunction = this.removeDuplicates(this.listItemFunction);
      this.listItemFunction = this.listItemFunction
      .filter(item => item.id !== 0 && item.id !== 1)
      .sort((a, b) => a.id - b.id);
    
  }

  handleTurnOffPopChecked():void{
    this.listItemChecked = []
    this.isCheckedAll = false
    this.isPopChecked = false
  }

  removeDuplicates(arr: any[]) {
    const uniqueIds:any[] = [];
      const uniqueArray = [];
      for (const obj of arr) {
          if (!uniqueIds.includes(obj.id)) {
              uniqueIds.push(obj.id);
              uniqueArray.push(obj);
          }
      }
      return uniqueArray;
  }

    filterQuestions(): void {
      if (!this.searchQuery.trim()) {
        console.log(1);
        this.listQuestionDataFilter = this.listItemFilterByCheckbox;
        this.listItemFilterByCheckbox = this.questions;
        this.handleFilterData();
        this.isNotFoundItem = false
        this.getValueNumberPage(this.numberShowItemPage);
        return;
      }
      let filteredBySearch = this.listItemFilterByCheckbox;
      if (this.searchQuery.trim()) {
        filteredBySearch = this.questions.filter(question =>
          question.idQues.toString().includes(this.searchQuery.trim()) ||
          question.question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        );
      }
    
      let filteredByStatus = filteredBySearch;
      if (this.listStatusFilter.length > 0) {
        filteredByStatus = filteredBySearch.filter(question =>
          this.listStatusFilter.includes(question.status)
        );
      }
    
      this.listItemFilterByCheckbox = filteredByStatus;
      if(this.listItemFilterByCheckbox.length <= 0){
        this.listQuestionDataFilter = []
        this.isCheckedAll = false
        this.isNotFoundItem = true
        console.log(2);
      }else{
        this.isNotFoundItem = false
        this.getValueNumberPage(this.numberShowItemPage);
      }

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

    handleListItemNotFound():void{
      if(this.listItemFilterByCheckbox.length <= 0){
        this.isCheckedAll = false
        this.isNotFoundItem = true
      }else{
        this.isNotFoundItem = false
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
          this.handleListItemNotFound()
          break
        case 'approve':
          this.isCheckApprove = !this.isCheckApprove
          this.handleSetArrayStatus(2);
          this.handleFilterData();
          this.getValueNumberPage(this.numberShowItemPage)
          this.handleListItemNotFound()
          break
        case 'send':
          this.isCheckSend = !this.isCheckSend
          this.handleSetArrayStatus(1);
          this.handleFilterData();
          this.getValueNumberPage(this.numberShowItemPage)
          this.handleListItemNotFound()
          break
        case 'stopApprove':
          this.isCheckStopApprove = !this.isCheckStopApprove
          this.handleSetArrayStatus(3);
          this.handleFilterData();
          this.getValueNumberPage(this.numberShowItemPage)
          this.handleListItemNotFound()
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

    handlePopChecked():void{
      if(this.listItemChecked.length > 0){
        this.isPopChecked = true
        this.getItemFunction()
      }else{
        this.isPopChecked = false
        this.getItemFunction()
      }
    }

    handleCheckboxChange() {
      if (this.isCheckedAll) {
          this.isCheckedAll = false;
          this.listItemChecked =  this.listItemChecked.filter(question => !this.listQuestionDataFilter.includes(question))  
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
      this.handlePopChecked();
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
      this.handlePopChecked();
  }


    hanldeChangeStatusPopfunction(index:number, status:number):void{
      if(this.currentIndexStatus == index){
        this.currentIndexStatus = -1
      }else{
        this.currentIndexStatus = index
      }
      this.listChildFunctionStatus = this.listFunctionStatus[status].function
    }

  
    handleChangeStatus(question: Question, status: number, fun: number):void{
      if(fun == 1 || fun == 0){
        this.sidebarVisible = true
        this.questionChoose = question
        console.log(this.questionChoose);
      }
      switch(fun){
        case 0:
          this.openSidebarByDetail(question)
          break
        case 1:
          this.openSidebarByUpdate(question)
   
          break
        case 2:
          if(this.checkTruthyData(question) == true){
            const questionUpdateSend = {...question}
            questionUpdateSend.status = 1
            this.updateStatus(questionUpdateSend)
            this.handleToast("Gửi duyệt thành công câu hỏi mã: " + question.idQues, true)
          }else{
            this.handleToast("Gửi duyệt thất bại câu hỏi phải đầy đủ thông tin! ", false)
          }
          break
        case 3:
          if(this.checkTruthyData(question) == true){
            const questionUpdateApprove = {...question}
            questionUpdateApprove.status = 2
            this.updateStatus(questionUpdateApprove)
            this.handleToast("Phê duyệt thành công câu hỏi mã: " + question.idQues, true)
          }else{
            this.handleToast("Phê duyệt thất bại câu hỏi phải đầy đủ thông tin! ", false)
          }
          break
        case 4:
          if(this.checkTruthyData(question) == true){
            const questionUpdateStopVision = {...question}
            questionUpdateStopVision.status = 3
            this.updateStatus(questionUpdateStopVision)
            this.handleToast("Ngừng áp dụng thành công câu hỏi mã: " + question.idQues, true)
          }else{
            this.handleToast("Gửi duyệt thất bại câu hỏi phải đầy đủ thông tin! ", false)
          }
          break
        case 5:
          if(this.checkTruthyData(question) == true){
            const questionUpdateReturn = {...question}
            questionUpdateReturn.status = 4
            this.updateStatus(questionUpdateReturn)
            this.handleToast("Trả về thành công câu hỏi mã: " + question.idQues, true)
          }
          break
        case 6:{
          this.listItemDelete.push(question)
          this.titleDelete = this.listItemDelete[0].question
          this.isPopDelete = true
        }
      } 
    }

    handleManyItemCheck(func:number):void{
      switch (func){
        case 0:
          console.log('Xem chi tiết');
          this.handleTurnOffPopChecked(); this.handleToast("Xem chi tiết thành công! ", true)
          break
        case 1:
          console.log("Chỉnh sửa");
          this.handleTurnOffPopChecked();
        this.handleToast("Chỉnh sửa thành công! ", true)
          break
      case 2:
        let successSend = false;
        this.listItemChecked.forEach(element => {
            if (element.status === 0 || element.status === 4) {
                if (this.checkTruthyData(element)) {
                    const questionUpdateSend = {...element};
                    questionUpdateSend.status = 1;
                    this.updateStatus(questionUpdateSend);
                    successSend = true;
                }
            }
        });
        if (successSend) {
          this.handleToast("Gửi duyệt thành công!", true);
        } else {
            this.handleToast("Không có phần tử nào được gửi duyệt thành công.", false);
        }
        this.getValueCurrentPage(this.currenPage);
        this.handlecheckAll();
        this.handleTurnOffPopChecked();
        break;

        
        case 3:
          let successApprove = false
          this.listItemChecked.forEach(element => {
            if(element.status == 1 || element.status == 3){
              if(this.checkTruthyData(element) == true){
                const questionUpdateSend = {...element}
                questionUpdateSend.status = 2
                this.updateStatus(questionUpdateSend)
                this.handleTurnOffPopChecked();
                this.handleToast("Phê duyệt thành công! ", true)
                successApprove = true
              }
            }
          });
        if (successApprove) {
          this.handleShowItemQuestion(this.numberShowItemPage, this.listItemFilterByCheckbox, this.currenPage)
          this.handlecheckAll()
            this.handleToast("Phê duyệt thành công!", true);
        } else {
            this.handleToast("Không có phần tử nào được phê duyệt thành công.", false);
        }
        this.handleTurnOffPopChecked();
          break

        case 4:
          let successStopVission = false
          this.listItemChecked.forEach(element => {
            if(element.status == 2){
              if(this.checkTruthyData(element) == true){
                const questionUpdateSend = {...element}
                questionUpdateSend.status = 3
                this.updateStatus(questionUpdateSend)
                successStopVission = true
              }
            }
          });
          if (successStopVission) {
            this.handleShowItemQuestion(this.numberShowItemPage, this.listItemFilterByCheckbox, this.currenPage)
            this.handlecheckAll()
            this.handleToast("Ngừng áp dụng thành công!", true);
          } else {
              this.handleToast("Không có phần tử nào được Ngừng áp dụng thành công.", false);
          }
          this.handleTurnOffPopChecked();
          break
        
        case 5:
          let successReturn = false
          this.listItemChecked.forEach(element => {
            if(element.status == 1 || element.status == 3){
              if(this.checkTruthyData(element) == true){
                const questionUpdateSend = {...element}
                questionUpdateSend.status = 4
                this.updateStatus(questionUpdateSend)
                successReturn = true
              
              }
            }
          });
          if (successReturn) {
            this.handleShowItemQuestion(this.numberShowItemPage, this.listItemFilterByCheckbox, this.currenPage)
            this.handlecheckAll()
            this.handleToast("Trả về thành công!", true);
          } else {
              this.handleToast("Không có phần tử nào được trả về thành công.", false);
          }
          this.handleTurnOffPopChecked();
          break

        case 6:
          this.listItemChecked.forEach(element => {
            if(element.status == 0){
              this.listItemDelete.push(element)
            }
            this.isPopDelete = true
          });
          break
      }
    }

    handleSearchByEnter(event: any) {
      if (event.keyCode === 13) {
        console.log(this.profileQuestion.get('group')?.value);
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
          this.inMemoryDataService.putDb({ collectionName: 'questions', collection: this.questions});
          this.handlePagination(this.numberShowItemPage, this.listQuestionDataFilter.length);
          this.handleShowItemQuestion(this.numberShowItemPage, this.listQuestionDataFilter, this.currenPage)
          this.handleListItemNotFound()
      } finally {
          this.isLoading = false;
      }
  }

  handleDeleteItem(listItemDelete:any[]):void{
    try{
      listItemDelete.forEach(element => {
        this.deleteQuestion(element.id) 
      });
    
    }finally{
      this.handleTurnOffPopChecked();
      this.listItemDelete = []
      this.isPopDelete = false
      this.handleToast("Xóa thành công!", true)
    }
    
  }
    
    deleteQuestion(id:number):void{
      this.questionService.deleteQuestion(id).subscribe(() => this.refreshData())
    }

    updateStatus(question: Question): void {
      this.questionService.updateStatus(question).subscribe(() => this.refreshData())
    }

    updateQuestion():void{
      const nameQuestion = this.profileQuestion.get('nameQuestion')?.value;
      const idQues = this.profileQuestion.get('idQues')?.value;
      const group = this.profileQuestion.get('group')?.value;
      const type = this.profileQuestion.get('type')?.value;
      const time = this.profileQuestion.get('time')?.value;
      const status = this.profileQuestion.get('status')?.value;
      const gradingMethod = this.profileQuestion.get('gradingMethod')?.value;
      if (nameQuestion && idQues && group && time && status) {
        if(isNaN(time)){
          this.handleToast("thời giàn làm bài không hợp lệ!", false)
        }else{
          const newQuestion: Question = {
            id: this.idItemUpdate,
            question: nameQuestion,
            idQues: idQues,
            gradingMethod: Number(gradingMethod),
            group: Number(group),
            type: Number(type),
            time: Number(time),
            status: Number(status)
          };
  
          this.questionService.updateStatus(newQuestion).subscribe(() => {this.sidebarVisible = false, this.refreshData()})
          this.handleToast("Chỉnh sửa thành công!", true)
        }
      }else{
        this.handleToast("Cập nhật không thành công! Phải chọn đầy đủ thông tin!!", false)
      }
    }

    addQuestion():void{
      const nameQuestion = this.profileQuestion.get('nameQuestion')?.value;
      const idQues = this.profileQuestion.get('idQues')?.value;
      const group = this.profileQuestion.get('group')?.value;
      const type = this.profileQuestion.get('type')?.value;
      const time = this.profileQuestion.get('time')?.value;
      const status = this.profileQuestion.get('status')?.value;
      const gradingMethod = this.profileQuestion.get('gradingMethod')?.value;
      const maxId = this.questions.reduce((max, current) => (current.id > max ? current.id : max), this.questions[0].id);
      if (nameQuestion && idQues && group && time) {
        if(isNaN(time)){
          this.handleToast("thời giàn làm bài không hợp lệ!", false)
        }else{
          const newQuestion: Question = {
            id: maxId + 1,
            question: nameQuestion,
            idQues: idQues,
            gradingMethod: -1,
            group: Number(group),
            type: -1,
            time: Number(time),
            status: Number(status)
          };
  
          this.questionService.addNewQuestion(newQuestion).subscribe( (addedQuestion: Question) => {
            this.handleToast("Thêm câu hỏi thành công!", true)
            this.sidebarVisible = false
            this.refreshData();
  
          },)
        }
        
      }else{
        this.handleToast("Thêm không thành công! Phải chọn đầy đủ thông tin!!", false)
      }

    }

    handleShowItemQuestion(numberPage: number, data: any[], currentPage: number): void {
      this.listQuestionDataFilter = data.filter((item: any, index: number) => {
          const startIndex = (currentPage - 1) * numberPage;
          const endIndex = currentPage * numberPage - 1;
          return index >= startIndex && index <= endIndex;
      });
      
  }
  
    getValueNumberPage(numberPage: any):void{
      this.handlePagination(numberPage, this.listItemFilterByCheckbox.length);
      this.numberShowItemPage = Number(numberPage)
      if(this.currenPage >= this.currentNumberPage){
        this.listPageItemShow = [...this.listNumberPage.slice(0, 4)];
        this.currenPage = 1
      }
      this.listItemIndexPage.forEach((array, index) => {
        if (this.currenPage === array[0] + 3) {
          this.startIndex = index * 4; 
          this.endIndex = Math.min(this.startIndex + 4, this.listNumberPage.length); 
          this.phasePage = Math.floor(this.startIndex / 4) - 1;
          this.listPageItemShow = [...this.listNumberPage.slice(this.startIndex, this.endIndex)];
        }
      });
  
      this.handleShowItemQuestion(this.numberShowItemPage, this.listItemFilterByCheckbox, this.currenPage)
      this.handlecheckAll()
    }

    getValueCurrentPage(value:number):void{
      this.currenPage = value
      this.handleShowItemQuestion(this.numberShowItemPage, this.listItemFilterByCheckbox, this.currenPage)
      this.handlecheckAll()
    }

    handleItemPageShow():void{
      this.listPageItemShow = [...this.listNumberPage.slice(this.startIndex, this.endIndex)]
      this.listItemIndexPage.forEach(element => {
        if(this.currenPage == element + 1){
          this.startIndex += 4
          this.endIndex += 4
          this.listPageItemShow = [...this.listNumberPage.slice(this.startIndex, this.endIndex )]
        }
      });

    }

    handlePagination(currentNumberPage: number, numberItem: number): void {
      this.currentNumberPage = Math.ceil(numberItem / currentNumberPage);
      let surplus = this.currentNumberPage % 4;
      this.listItemIndexPage = [];
      this.listNumberPage = [];

      if(this.currenPage > this.currentNumberPage){
        this.currenPage = 1
      }
    
      for (let i = 0; i < this.currentNumberPage; i++) {
        this.listNumberPage.push(i + 1);
      }
  
      for (let i = 0; i < this.listNumberPage.length; i += 4) {
        this.listItemIndexPage.push(this.listNumberPage.slice(i, i + 4));
      }
      if (surplus > 0) {
        for (let i = 0; i < surplus; i++) {
          this.listItemIndexPage[this.listItemIndexPage.length - 1].push(this.listNumberPage[this.listNumberPage.length - surplus + i]);
        }
      }
      this.handleThreeDot();
      this.handleItemPageShow();
    }

    
    handlePreCurrentPage():void{
      if(this.currenPage <= 1){
        return
      }
      this.currenPage -=1
      this.getValueCurrentPage(this.currenPage)
      this.handlecheckAll()

      this.listItemIndexPage.forEach((array, index) => {
        if (this.currenPage === array[0] + 3) {
          this.startIndex = index * 4; 
          this.endIndex = Math.min(this.startIndex + 4, this.listNumberPage.length); 
          this.phasePage = Math.floor(this.startIndex / 4) - 1;
          this.listPageItemShow = [...this.listNumberPage.slice(this.startIndex, this.endIndex)];
        }
      });
      this.handleThreeDot();
    }

    handleFirstPage():void{
      if(this.currenPage == 1){
        return
      }
      this.currenPage = 1
      this.getValueCurrentPage(this.currenPage)
      this.handlecheckAll()

      this.startIndex = 0; 
      this.endIndex = Math.min(this.startIndex + 4, this.listNumberPage.length); 
      this.phasePage = Math.floor(this.startIndex / 4) - 1;
      this.listPageItemShow = [...this.listNumberPage.slice(this.startIndex, this.endIndex)];
      this.handleThreeDot();
    }

    handleNextCurrentPage(): void {
      if (this.currenPage >= this.currentNumberPage) {
        return;
      }
      
      this.currenPage += 1;
      this.getValueCurrentPage(this.currenPage);
      this.handlecheckAll();
  
      this.listItemIndexPage.forEach((array, index) => {
        if (this.currenPage  === array[0]) {
          this.startIndex = index * 4; 
          this.endIndex = Math.min(this.startIndex + 4, this.listNumberPage.length); 
          this.phasePage = Math.floor(this.startIndex / 4) - 1;
          this.listPageItemShow = [...this.listNumberPage.slice(this.startIndex, this.endIndex)];
        }
      });
  
      this.handleThreeDot();
    }

    handleLastPage(): void {
      if (this.currenPage === this.currentNumberPage) {
        return; 
      }
      this.isShowEndthreeDot = false
      this.currenPage = this.currentNumberPage; 
      this.getValueCurrentPage(this.currenPage); 
      this.handlecheckAll(); 
    
      this.startIndex = Math.floor((this.currentNumberPage - 1) / 4) * 4;
      this.endIndex = Math.min(this.startIndex + 4, this.listNumberPage.length);
      this.phasePage = Math.floor(this.startIndex / 4);
      this.listPageItemShow = [...this.listNumberPage.slice(this.startIndex, this.endIndex)];
    }
    

    handleThreeDot():void{
      if(this.currentNumberPage <= 4){
        this.isShowEndthreeDot = false
      }else{
        let numberItemEnd = this.currentNumberPage % 4
        const lastArray = this.listItemIndexPage[this.listItemIndexPage.length - 1];
        const firstNumberLastArray = lastArray[0];
        // console.log(firstNumberLastArray);
        if(this.currenPage < firstNumberLastArray){
          this.isShowEndthreeDot = true
        }else{
          this.isShowEndthreeDot = false
        }
      }
    
    }

    ngOnDestroy(): void {
      this.db = this.inMemoryDataService.createDb();
      this.inMemoryDataService.putDb({ collectionName: 'status', collection: this.db.listStatusFilter});
    }
  }
