import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../Models/user-info';
import { passwordCheck } from '../register/register.component';
import { UserInfoService } from '../Services/userInfo.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private _user:UserInfoService, private _router:Router) { }

  isValidUser:boolean=false;
  validUser:boolean=true;
  isCorrectAnswer:boolean=false;
  correctAnswer:boolean=true;

  userDetails:UserInfo={
    username:"",
    passWord:"",
    securityQuestion:"",
    securityAnswer:""
  }

  passwordChange=new FormGroup({
    username:new FormControl("",[Validators.required]),
    securityAnswer: new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    confirmPassword:new FormControl("",[Validators.required, passwordCheck]),
  })

  checkUsername(){
    this._user.getUserById(this.passwordChange.controls.username.value).subscribe(response=>{
      if(response){
        this.isValidUser=true;
        this.validUser=true;
        this.userDetails=response;
        console.log(this.userDetails.securityQuestion);
      }
      else{
        this.validUser=false;
      }
    })
  }
  
  checkSecurityAnswer(){
    if(this.passwordChange.controls.securityAnswer.value.toLowerCase()===this.userDetails.securityAnswer.toLowerCase()){
      this.isCorrectAnswer=true;
    }
    else{
      this.correctAnswer=false;
    }
  }

  updatePassword(){
    this.userDetails.passWord=this.passwordChange.controls.password.value;

    this._user.updateUser(this.userDetails.username,this.userDetails).subscribe();

    this._router.navigate(["/Login"]);
  }

}
