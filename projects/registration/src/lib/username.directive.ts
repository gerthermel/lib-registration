import { Validator, NG_VALIDATORS, FormControl, ValidatorFn } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';
import { CreateAccountService } from './create-account.service';
 
 
@Directive({
  selector: '[username]',
  providers: [
    { provide: NG_VALIDATORS, 
      useExisting: usernameDirective, 
      multi: true 
    }
  ]
})
export class usernameDirective implements Validator {
  private aliasTimeout:any;
  private generalTimeout:any;
  private timeout:any = 600;
  private pending = false;
  constructor(
    public http:HttpClient,
    public service:CreateAccountService,
  ){
  }

  validate(c: FormControl) {
    return this.service.validateUsername(c);
  }  


}