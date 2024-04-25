import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-message',
  templateUrl: './toggle-message.component.html',
  styleUrl: './toggle-message.component.scss'
})
export class ToggleMessageComponent {
  statusMessage:boolean = false
  message:string = ''
  isPopToast:boolean = false
}
