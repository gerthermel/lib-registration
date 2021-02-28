import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationModule } from 'registration'
import { FormsModule } from '@angular/forms';
import { usernameDirective } from './username.directive'
import { emailDirective } from './email.directive'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    usernameDirective,
    emailDirective,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
