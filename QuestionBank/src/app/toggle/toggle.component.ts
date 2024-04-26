import { Component, ContentChildren, QueryList, AfterContentInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent  {
  @Input() mainColor: string = 'white';
  @Input() isVisibleShow:boolean = false
  @Output() myEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor() { }

  close():void{
    this.isVisibleShow = false
  }

  emitEvent():void {
    this.myEvent.emit();
  }

  emitEventCancel():void{
    this.cancelEvent.emit()
  }
}
