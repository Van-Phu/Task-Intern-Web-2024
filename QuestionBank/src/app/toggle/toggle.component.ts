import { Component, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent  {

 


  @Input() mainColor: string = 'white';
  @Input() isVisibleShow:boolean = false

  constructor() { }

  close():void{
    this.isVisibleShow = false
  }

}
