import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataParam = new BehaviorSubject<string>('');
  private dataUrl = new BehaviorSubject<string>('');

  currentData = this.dataParam.asObservable();
  currentURL = this.dataUrl.asObservable();

  constructor(private router: Router, private location: Location) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.dataUrl.next(this.location.path());
      }
    });
  }

  changeParamData(data: string) {
    this.dataParam.next(data);
  }

  changeParamDataModule(data: string){
    this.dataParam.next(this.dataParam + data)
  }
}
