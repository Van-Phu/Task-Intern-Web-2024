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
  itemSelected = 0

  isDropdownItem = true
  dataItemChild = -1

  href: string = ""
  subDataService: any = {} 
  selectedItems:number[] = [0]

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.subDataService = this.dataService.currentURL.subscribe(data =>{
      this.href = data
    })
    this.selectedModule(this.href + '/nhansu')
  }

  selectItem(index: number){
    let indexToRemove = -1;
    this.selectedItems.forEach((element, i) => {
      if(element === index){
        indexToRemove = i;
        return;
      }      
    });
    if (indexToRemove !== -1) {
      this.selectedItems.splice(indexToRemove, 1);
    }else{
      this.selectedItems.push(index);
    }
    if(this.selectedItems.length > 0){
      this.isDropdownItem = false
    }else{
      this.isDropdownItem = true
    }
    
  }
  
  selectedModule(dataRoute: string){
    this.dataService.changeParamData(this.href + dataRoute)

  }

  setItemDropdown(){
    this.isDropdownItem = !this.isDropdownItem
  }

  selectItemDrop(data:number){
    this.dataItemChild = data
  }

ngOnDestroy(): void {
    if (this.subDataService) {
      this.subDataService.unsubscribe();
    }
  }
}
