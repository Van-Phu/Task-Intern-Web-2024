import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  isShowDeletePop: boolean = false
  isShowWarningPop: boolean = false
  isShowSuccessPop: boolean = false

  vari: any = '2024-04-26'

  handleButtonClick() {
    console.log('Button clicked in parent component');
  }

  handleDeletePop():void{
    console.log('click');
    this.isShowDeletePop = true
  }
  
  handleWarningPop():void{
    this.isShowWarningPop = true
  }

  handleSuccessPop():void{
    this.isShowSuccessPop = true
  }

  handleEvent() {
    alert("Delete")
  }

  handleWarningEvent() {
    alert("Warning")
  }

  handleSuccessEvent() {
    alert("Succes")
  }

  handleCancelEvent() {
    alert("cancel")
  }
}
