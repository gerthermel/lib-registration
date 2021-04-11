import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { isConstructorDeclaration } from 'typescript';
import { CreateAccountService } from './create-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'testapp';
  formValid = true;
  ngOnInit(){
  }
  constructor(
    public service: CreateAccountService,
    public http:HttpClient,
    public router:Router,
  ){

  }

  onSubmit(f:NgForm){
    var data = f.value
    for( let key of Object.keys(data) ){
      if( !data[key] ){
        f.form.controls[key].setErrors({'required': true})
        f.form.controls[key].markAsDirty()
        f.form.controls[key].markAsTouched()
      }
    }
    this.http.post(this.service.apiUrl, {form: data}, {withCredentials:true}).subscribe(
      (res)=>{
        console.log(res)
        if( this.service.redirect ){
          this.router.navigateByUrl(this.service.redirectUrl)
        }else{
          this.service.isSuccess = true;
        }
      },
      (error) =>{
				this.service.isError = true;
        this.service.errorMessage = error.error.message;
			}
    )
    return
    if(f.valid){
      console.log('valid')
      this.formValid = true;
    }else{
      console.log('invalid')
      this.formValid = false;
    }
  }
}
