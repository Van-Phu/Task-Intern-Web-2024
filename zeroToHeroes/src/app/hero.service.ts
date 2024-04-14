//Hàm để xử lí dữ liệu thông tin như một nới control giữ UI với Data
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  //khởi tạo một url api
  private heroesUrl = 'api/heroes';
  constructor(private messageService: MessagesService, private http: HttpClient){}
  
  // getHeroes(): Observable<Hero[]>{
  //   const heroes = of(HEROES)
  //   this.messageService.add('HeroService: feached heroes')
  //   return heroes
  // }


  //Hàm xử lý lỗi 
  private handleError<T>(operation = 'operation', result ? : T){
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  //hàm lấy tất cả heroes với url
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Hero[]>('getHeroes', [])))
  }

  //lấy một heros với giá trị truyền vào là id
  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError<Hero>(`getHero id=${id}`)))
    // const hero = HEROES.find(hero => hero.id === id)!;
    // this.messageService.add(`HeroService: fetched hero id =${id}`)
    // return of(hero)
  }

  //Cập nhật hero với gái trị mới (put truyền vào url, giá trị hero mới, httpOptions)
  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(tap (_ => this.log(`update hero id = ${hero.id}`)), catchError(this.handleError<any>('updateHero')))
  }

  //thêm một hero 
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero ,this.httpOptions).pipe(tap((newHero: Hero) => this.log(`added hero w / id=${newHero.id}`)), catchError(this.handleError<Hero>(`addHero`)))
  }

  //xóa một hero
  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions).pipe(tap(_ => this.log(`deleted hero id=${id}`)), catchError(this.handleError<Hero>(`deleteHero`)))
  }

  //tìm kiếm một hero
  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){return of([])}
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(tap(x => x.length? this.log(`found heroes matching "${term}`): this.log(`no heroes mathching "${term}"`)), catchError(this.handleError<Hero[]>('seachHeroes', [])))
  }
}
