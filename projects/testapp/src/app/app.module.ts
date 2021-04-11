import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { usernameDirective } from './username.directive'
import { emailDirective } from './email.directive'
import { HttpClientModule } from '@angular/common/http';
import { passwordDirective } from './password.directive';

@NgModule({
  declarations: [
    AppComponent,
    usernameDirective,
    emailDirective,
    passwordDirective,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
