import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccountService } from './create-account.service';

@Component({
  selector: 'germel-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  @Input() validationApi!:string;
  @Input() redirect!:boolean;
  @Input() redirectUrl!:string;

  public username = '';
  formValid = true;

  constructor(
    public service: CreateAccountService,
    public http:HttpClient,
    public router:Router,
  ){
  }
  ngOnInit(){
    this.service.apiUrl = this.validationApi;
    this.service.redirect = this.redirect;
    this.service.redirectUrl = this.redirectUrl;
  }
  onSubmit(f:NgForm){
    var data = f.value
    for( let key of Object.keys(data) ){
      if( !data[key] ){
        f.form.controls[key].setErrors({'required': true})
        f.form.controls[key].markAsDirty()
        f.form.controls[key].markAsTouched()
        console.log(key+' empty')
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
