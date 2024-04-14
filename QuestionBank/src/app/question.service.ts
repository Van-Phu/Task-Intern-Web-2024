import { Injectable } from '@angular/core';
import { Question } from './question';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  private questionUrl = 'api/questions';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private handleError<T>(operation = 'operation', result ? : T){
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(this.questionUrl)
    .pipe()
  }
}
