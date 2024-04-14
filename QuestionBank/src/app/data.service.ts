import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  dataDrawer = new BehaviorSubject<string>('');

  currentData = this.dataDrawer.asObservable();

  changeDrawerData(data: string){
    this.dataDrawer.next(data)
  }

  // changeRoulet(data: string){
  //   this.data
  // }
}
