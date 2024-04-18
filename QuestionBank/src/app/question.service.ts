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

  updateStatus(question: Question): Observable<any>{
    return this.http.put(this.questionUrl, question, this.httpOptions).pipe(
      tap()
    )
  }

  updateQuestion(question: Question): Observable<any>{
    return this.http.put(this.questionUrl, question, this.httpOptions).pipe(
      tap()
    )
  }

  deleteQuestion(id:number): Observable<Question>{
    const url = `${this.questionUrl}/${id}`;
    return this.http.delete<Question>(url, this.httpOptions).pipe(
    );
  }
  addNewQuestion(question: Question):Observable<Question>{
    return this.http.post<Question>(this.questionUrl, question, this.httpOptions).pipe()
  }
  
}
