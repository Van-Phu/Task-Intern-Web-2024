import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { HomeComponent } from './home/home.component';
import { PersonelComponent } from './personel/personel.component';
import { FinaceComponent } from './finace/finace.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'nhansu', component: PersonelComponent,
    // children: [
    //   { path: 'questions', component: QuestionBankComponent },
    // ]
  },
  {path: 'thongtin', component: InfoComponent},
  {path: 'taichinh', component: FinaceComponent},
  {path: 'trangchu', component: HomeComponent},
  {path: 'nhansu/questions', component: QuestionBankComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
