import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import { promise } from 'protractor';
import { TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  public pending = {
    username: false,
    email: false,
    password: false
  };
  private hasRan = false;
  private generalTimeout:any;
  private emailTimeout:any;
  private passwordTimeout:any;
  private timeout:any = 600;

  constructor(
    private http:HttpClient,
  ) { 

  }

  async validateUsername(c: FormControl){
    clearTimeout(this.generalTimeout);
    if(!c.pristine){
      this.pending.username = true;
      this.generalTimeout = setTimeout(()=>{
        this.usernameValidationConditions(c).then( ()=>{
          this.pending.username = false;
        }
        );
      },this.timeout)
    }
  }

  usernameValidationConditions(c:FormControl) {
    return new Promise((resolve, reject)=> {
      var alias = c
      if( !alias.value){
        alias.setErrors({'required': true});
      }else if(alias && /^\w+$/.test(alias.value)==false){//if not only numbers and letters
        alias.setErrors({'illegalChars': true});
      }else if(/^\d+$/.test(alias.value)==true){//If only numbers
        alias.setErrors({'onlyNumbers': true});
      }else if( c.value.length < 4 ){
        alias.setErrors({'tooShort': true});
      }else{
        new Promise<any>((resolve, reject) =>{
          this.http.post( 'http://localhost:8080/server/create-account/username', {username: alias.value}, {withCredentials: true} ).subscribe(
          (res: any)=>{
            if( res && res.isTaken == true){
              alias.setErrors({'isTaken': true});
            }else{
              alias.setErrors(null);
            }
            resolve(res)
          })	
        })
      }
     resolve(null);
    });
  }

  async validateEmail(c:FormControl){
    clearTimeout(this.emailTimeout);
    if(!c.pristine){
      this.pending.email = true;
      this.emailTimeout = setTimeout(()=>{
        this.emailValidationConditions(c).then( ()=>{
          this.pending.email = false;
        }
        );
      },this.timeout)
    }
  }

  emailValidationConditions(c:FormControl) {
    return new Promise( (resolve, reject  )=>{
      if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value)==false){//if not only numbers and letters
        c.setErrors({'invalid': true});
      }else{
        const promise = new Promise<any>((resolve, reject) =>{
          this.http.post( 'https://localhost:8080/server/create-account/email', {email: c.value}, {withCredentials: true} ).subscribe(
          (res: any)=>{
            if( res && res.isTaken == true){
              c.setErrors({'isTaken': true});
            }else{
              c.setErrors(null);
            }
            resolve(res)
          })	
        })
      }
      resolve(null);
    })
  }

  async validatePassword(c:FormControl) {
    this.pending.password = true;
    clearTimeout(this.passwordTimeout);
    this.passwordTimeout = setTimeout(()=>{
      if( !c.value ){
        c.setErrors({'required':true});
      }else{
        c.setErrors(null);
      }
      this.pending.password = false;
    }, this.timeout);

  }

  passwordValidationConditions(c:FormControl) {

  }

}
