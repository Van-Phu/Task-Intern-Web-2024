import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderItems } from '../data/header-item';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faCoffee = faCoffee;
  faMagnifyingGlass = faMagnifyingGlass
  faBell = faBell
  dropdownActive = false

  headerItems = HeaderItems
  itemSelect = -1
  

  href: string = "";

  constructor(private dataService: DataService, private router: Router, private location: Location){}

  ngOnInit(): void {
    this.dataService.currentURL.subscribe(data => {
      this.href = data
    })

  }
 
  selectItemHead(index: number, dataRoute: string){
    this.itemSelect = index
    this.dataService.changeParamData(dataRoute)
  }

}
