import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MyInMemoryDataService } from './in-memory-data.service';
import { CustomPipeStatusComponent } from './custom-pipe-status/custom-pipe-status.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { FinaceComponent } from './finace/finace.component';
import {FormsModule} from '@angular/forms'
import { PersonelComponent } from './personel/personel.component';
import { SidebarModule } from 'primeng/sidebar';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    QuestionBankComponent,
    CustomPipeStatusComponent,
    HomeComponent,
    InfoComponent,
    FinaceComponent,
    PersonelComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    
    HttpClientInMemoryWebApiModule.forRoot(
      MyInMemoryDataService
    )
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
