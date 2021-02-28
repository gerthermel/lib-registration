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

  onSubmit(newUserForm:NgForm){
    if(newUserForm.valid){
      console.log('valid')
      this.formValid = true;
    }else{
      console.log('invalid')
      this.formValid = false;
    }
  }
}
