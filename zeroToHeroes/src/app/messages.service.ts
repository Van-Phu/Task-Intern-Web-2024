import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }
  messages: string[] = [];

  //hàm add nhận messages với kiểu dữ liệu string và push và mãng mesages
  add(messages: string){
    this.messages.push(messages)
  }

  //hàm clear sẽ làm mãng messages về rỗng
  clear(){
    this.messages = []
  }
}
