import { Validator, NG_VALIDATORS, FormControl, ValidatorFn } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';
import { CreateAccountService } from './create-account.service';
 
 
@Directive({
  selector: '[password]',
  providers: [
    { provide: NG_VALIDATORS, 
      useExisting: passwordDirective, 
      multi: true 
    }
  ]
})
export class passwordDirective implements Validator {
  constructor(
    public http:HttpClient,
    public service:CreateAccountService,
  ){
  }

  validate(c: FormControl) {
    return this.service.validatePassword(c);
  }  
}