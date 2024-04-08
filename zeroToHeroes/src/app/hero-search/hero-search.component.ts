import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, Subject, from } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators'

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) {}
  search(term:string):void{
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(debounceTime(300), distinctUntilChanged(), switchMap((term: string) => this.heroService.searchHeroes(term)))
  }

}
