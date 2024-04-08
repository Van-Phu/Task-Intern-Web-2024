import { Component } from '@angular/core';
import { MessagesService } from '../messages.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  imports:[NgIf, NgFor]
})
export class MessagesComponent {
  constructor(public messageService: MessagesService){}
}
