import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'nhansu', component: QuestionBankComponent},
  {path: 'thongtin', component: QuestionBankComponent},
  {path: 'taichinh', component: QuestionBankComponent},
  {path: 'trangchu', component: QuestionBankComponent},
  {path: 'nhansu/questions', component: QuestionBankComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
