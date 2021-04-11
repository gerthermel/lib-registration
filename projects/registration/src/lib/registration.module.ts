import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { emailDirective } from './email.directive';
import { passwordDirective } from './password.directive';
import { RegistrationComponent } from './registration.component';
import { usernameDirective } from './username.directive';



@NgModule({
  declarations: [
    RegistrationComponent,
    usernameDirective,
    emailDirective,
    passwordDirective,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [RegistrationComponent]
})
export class GermelRegistration { }
