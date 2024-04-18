import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class MyInMemoryDataService implements InMemoryDbService {

  createDb() {
    const savedQuestions = localStorage.getItem('questions');
    console.log(savedQuestions);
    const questions = savedQuestions ? JSON.parse(savedQuestions) : [
      { 
        id: 0, 
        idQues: "MX01",
        question: "Cuộc sống bắt đầu từ ban đêm. Đêm là lúc chúng ta sống thật với chính mình, không còn phải giả tạo cảm giác cô đơn, không còn kiềm chế khi buồn, không còn phải giả tạo cười, không cần làm phiền cuộc sống của ai đó.",
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
      },
      { 
        id: 2, 
        idQues: "MX03",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 1,
        group: 2,
        time: 30,
        status: 1
      },
      { 
        id: 3, 
        idQues: "MX04",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 3,
        group: 1,
        time: 30,
        status: 2
      },
      { 
        id: 4, 
        // idQues: "MX00",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 0,
        group: 0,
        time: 30,
        status: 4
      },
      { 
        id: 5, 
        idQues: "MX05",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 2,
        group: 1,
        time: 30,
        status: 3
      },
      { 
        id: 6, 
        idQues: "MX06",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 0,
        group: 0,
        time: 30,
        status: 0
      },
      { 
        id: 7, 
        idQues: "MX07",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 2,
        group: 1,
        time: 30,
        status: 3
      },
      { 
        id: 8, 
        idQues: "MX08",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 0,
        group: 0,
        time: 30,
        status: 0
      },
      { 
        id: 9, 
        idQues: "MX09",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 2,
        group: 1,
        time: 30,
        status: 3
      },
      { 
        id: 10, 
        idQues: "MX10",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 0,
        group: 0,
        time: 30,
        status: 0
      },
      { 
        id: 11, 
        idQues: "MX11",
        question: "Cách quay mv đến màu sắc, bố cục, diễn viên nó rất là hiện đại, sang, chất chơi. Chính chất chơi ngay trong máu, bản chất chứ ko phải cố tạo màu. Các mv của anh có phong cách này tôi mê mệt ",
        type: 2,
        group: 1,
        time: 30,
        status: 3
      },
    ];
    return { questions };
  }

  putDb(reqInfo: any) {
    if (reqInfo.collectionName === 'questions') {
      localStorage.setItem('questions', JSON.stringify(reqInfo.collection));
    }
    return reqInfo;
  }
}
