// file khởi tạo các route để điều hướng
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  //Khởi tạo route đâu tiên khi truy cập vào web
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //khởi tạo route heroes
  {path:'heroes', component: HeroesComponent},
  //khởi tạo route dashboard
  {path:'dashboard' , component: DashboardComponent},
  //khởi tạo route detail
  {path:'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
