import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  ){

  }

  onSubmit(f:NgForm){
    var data = f.value
    console.log()
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
