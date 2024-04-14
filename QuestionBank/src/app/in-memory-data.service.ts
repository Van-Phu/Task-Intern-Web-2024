import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class MyInMemoryDataService implements InMemoryDbService {

  createDb() {
    const questions = [
      { 
        id: 0, 
        idQues: "MX00",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 0,
        group: 0,
        time: 30,
        status: 0
      },
      { 
        id: 1, 
        idQues: "MX02",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 2,
        group: 1,
        time: 30,
        status: 3
      }
    ];
    return { questions };
  }
}
