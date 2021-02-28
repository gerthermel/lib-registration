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
  private timeout:any = 600;

  constructor(
    private http:HttpClient,
  ) { 

  }

  async validateUsername(c: FormControl){
    clearTimeout(this.generalTimeout);
    if(!c.pristine){
      console.log('1')
      this.pending.username = true;
      this.generalTimeout = setTimeout(()=>{
        this.timeoutWrapp(c).then( ()=>{
          this.pending.username = false;
        }
        );
      },this.timeout)
    }
  }

  timeoutWrapp(c:FormControl) {
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

  validateData(c:FormControl){
    console.log('1')
    setTimeout(()=>{
      this.pending.username = false;
    },2000)
      /*
      if(c.value){
        this.pending.username = true;
        console.log(this.pending.username)
        var alias = c
        
      }else{
        c.setErrors({'required':true});
        return null;
      }
      */
  }

}
