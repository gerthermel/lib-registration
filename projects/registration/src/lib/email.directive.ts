import { Validator, NG_VALIDATORS, FormControl, ValidatorFn } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';
import { CreateAccountService } from './create-account.service';
 
 
@Directive({
  selector: '[email]',
  providers: [
    { provide: NG_VALIDATORS, 
      useExisting: emailDirective, 
      multi: true 
    }
  ]
})
export class emailDirective implements Validator {
  private generalTimeout:any;
  private timeout:any = 600;
  constructor(
    public http:HttpClient,
    public service:CreateAccountService,
  ){
  }

  validate(c: FormControl) {
    return this.service.validateEmail(c);
  }  

  /*
  async validateUsername(c: FormControl){
    clearTimeout(this.generalTimeout);
    this.generalTimeout = await setTimeout(() => {
      if(c.value){
        if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value)==false){//if not only numbers and letters
          c.setErrors({'invalid': true});
          return { 'invalid': true };
        }else{
          const promise = new Promise<any>((resolve, reject) =>{
            this.http.post( environment.apiUrl+'/server/create-account/email', {email: c.value}, {withCredentials: true} ).subscribe(
            (res: any)=>{
              if( res && res.isTaken == true){
                c.setErrors({'isTaken': true});
              }else{
                c.setErrors(null);
              }
              resolve(res)
            })	
          })
          return promise;
        }
      }else{
        c.setErrors({'required':true});
        return null;
      }
    }, this.timeout)
    c.setErrors(null);
    return null;
  }
  */

}