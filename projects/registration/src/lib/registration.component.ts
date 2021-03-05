import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateAccountService } from './create-account.service';

@Component({
  selector: 'germel-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  @Input() validationApi!:string;

  public username = '';
  formValid = true;

  constructor(
    public service: CreateAccountService,
  ){
  }
  ngOnInit(){
    this.service.apiUrl = this.validationApi;
  }
  onSubmit(f:NgForm){
    var data = f.value
    console.log(this.validationApi)
    for( let key of Object.keys(data) ){
      if( !data[key] ){
        f.form.controls[key].setErrors({'required': true})
        f.form.controls[key].markAsDirty()
        f.form.controls[key].markAsTouched()
        console.log(key+' empty')
      }
    }
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
