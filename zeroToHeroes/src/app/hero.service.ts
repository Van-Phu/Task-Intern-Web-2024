import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-herose';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { error } from 'console';
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  constructor(private messageService: MessagesService, private http: HttpClient){}
  
  // getHeroes(): Observable<Hero[]>{
  //   const heroes = of(HEROES)
  //   this.messageService.add('HeroService: feached heroes')
  //   return heroes
  // }

  private handleError<T>(operation = 'operation', result ? : T){
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Hero[]>('getHeroes', [])))
  }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError<Hero>(`getHero id=${id}`)))
    // const hero = HEROES.find(hero => hero.id === id)!;
    // this.messageService.add(`HeroService: fetched hero id =${id}`)
    // return of(hero)
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(tap (_ => this.log(`update hero id = ${hero.id}`)), catchError(this.handleError<any>('updateHero')))
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero ,this.httpOptions).pipe(tap((newHero: Hero) => this.log(`added hero w / id=${newHero.id}`)), catchError(this.handleError<Hero>(`addHero`)))
  }

  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions).pipe(tap(_ => this.log(`deleted hero id=${id}`)), catchError(this.handleError<Hero>(`deleteHero`)))
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){return of([])}
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(tap(x => x.length? this.log(`found heroes matching "${term}`): this.log(`no heroes mathching "${term}"`)), catchError(this.handleError<Hero[]>('seachHeroes', [])))
  }
}
