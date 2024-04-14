import { Component } from '@angular/core';
import { HeaderItems } from '../data/header-item';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';


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

  constructor(private dataService: DataService){

  }

  headerItems = HeaderItems
  itemSelect = -1
 
  selectItemHead(index: number, dataRoute: string){
    this.itemSelect = index
    this.dataService.changeDrawerData(dataRoute)
  }

}
