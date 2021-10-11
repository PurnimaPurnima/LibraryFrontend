import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../Services/global.service';
import { UserInfoService } from '../Services/userInfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../register/register.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserInfoService, private _global:GlobalService, private _router:Router) { }

  verifyUser:boolean=true;
  correctPassword:string="";
  verifyPassword:boolean=true;

  loginUser=new FormGroup(
    {
      username:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    }
  )

  checkUsername(){

    this._userService.getUserById(this.loginUser.controls.username.value).subscribe(data=>{
      if(this.loginUser.controls.username.value=="admin")
        this.correctPassword="trueAdmin";
      else if(data==null)
        this.verifyUser=false;
      else{
        this.verifyUser=true
        this.correctPassword=data.passWord
      }
    })
  }

  checkPassword(){
    if(this.loginUser.controls.password.value!=this.correctPassword){
      this.verifyPassword=false;
    }
    else{
      this._global.globalUsername=this.loginUser.controls.username.value;
      this.verifyPassword=true;
      this._router.navigate(["/Booklist"])
    }
  }

  ngOnInit(): void {
  }

}
