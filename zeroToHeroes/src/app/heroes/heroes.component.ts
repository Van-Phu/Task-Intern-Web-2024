import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  
  

  constructor(private heroService: HeroService) { }

  //lần đầu khởi chạy component sẽ lấy mãng dữ liệu của heroes
  ngOnInit(): void {
    this.getHeroes();
  }

  //hàm thực hiện gọi getHeroes tại heroService và lấy dữ liệu của toàn bộ heroes
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }


  //hàm thực hiện thêm một hero mới
  add(name: string){
    name = name.trim();
    if(!name) {return}
    this.heroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero)})
  }

  //hàm thực hiện xóa một hero
  delete(hero:Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }


}