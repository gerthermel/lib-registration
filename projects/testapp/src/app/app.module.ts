import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationModule } from 'registration'
import { FormsModule } from '@angular/forms';
import { formatCheckDirective } from './formatCheck.directive'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    formatCheckDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
