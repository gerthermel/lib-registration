import { Validator, NG_VALIDATORS, FormControl, ValidatorFn } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';
 
 
@Directive({
  selector: '[formatCheck]',
  providers: [
    { provide: NG_VALIDATORS, 
      useExisting: formatCheckDirective, 
      multi: true 
    }
  ]
})
export class formatCheckDirective implements Validator {
  private aliasTimeout:any;
  private generalTimeout:any;
  private timeout:any = 600;
  constructor(
    public http:HttpClient,
  ){
  }

  validate(c: FormControl) {
    return this.validateUsername(c);
  }  

  async validateUsername(c: FormControl){
    clearTimeout(this.generalTimeout);
    this.generalTimeout = await setTimeout(() => {
      if(c.value){
        var alias = c
        if(alias && /^\w+$/.test(alias.value)==false){//if not only numbers and letters
          alias.setErrors({'illegalChars': true});
          return { 'illegalChars': true };
        }else if(/^\d+$/.test(alias.value)==true){//If only numbers
          alias.setErrors({'onlyNumbers': true});
          return { 'onlyNumbers': true };
        }else if( c.value.length < 3 ){
          alias.setErrors({'tooShort': true});
          return { 'tooShort': true }
        }else{
          const promise = new Promise<any>((resolve, reject) =>{
            this.http.post( environment.apiUrl+'/server/create-account/is-taken', {username: alias.value}, {withCredentials: true} ).subscribe(
            (res: any)=>{
              console.log(res);
              if( res && res.isTaken == true){
                alias.setErrors({'isTaken': true});
              }else{
                alias.setErrors(null);
              }
              resolve(res)
            })	
          })
          return promise;
        }
      }else{
        c.setErrors(null);
        return null;
      }
    }, this.timeout)
    c.setErrors(null);
    return null;
  }

  async isTaken(userName:string, control: FormControl){
    const promise = new Promise<any>((resolve, reject) =>{
      this.http.post( environment.apiUrl+'/server/create-account/is-taken', {username: userName}, {withCredentials: true} ).subscribe(
      (res)=>{
        console.log(res);
        if( res ){
          resolve(res)
        }
      })	
    })
    return promise;
  }

}