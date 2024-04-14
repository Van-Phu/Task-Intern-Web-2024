import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCoffee, faMagnifyingGlass, faBell, faChevronDown, faListUl } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DrawerLeftData } from '../data/data-drawer-left';
import { HeaderItems } from '../data/header-item';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  DrawerLeftData = DrawerLeftData
  faChevronDown = faChevronDown
  activeDropdown = false

  showFiller = false;
  itemSelected = -1

  isDropdownItem = false
  itemDropSelected = -1

  drawerData: string = ""
  subDataService: any = {} 

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.subDataService = this.dataService.currentData.subscribe(data =>{
      this.drawerData = data
    })

  }
  selectItem(index: number){
    if(this.itemSelected == index){
      this.activeDropdown = false
    }else{
      this.isDropdownItem = true
      this.itemSelected = index
      this.activeDropdown = true
    }
  }
  

  selectItemDropdown(index: number){
    this.itemDropSelected  = index
  }

  setItemDropdown(){
    this.isDropdownItem = !this.isDropdownItem
  }

  ngOnDestroy(): void {
    this.subDataService.unsubscribe();
  }
}
