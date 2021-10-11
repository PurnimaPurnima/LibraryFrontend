import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserInfoService } from '../Services/userInfo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent {

  constructor(private _registerService:UserInfoService, private _router:Router) { }

  message:string="";
  usernameAvailable:boolean=true;

  registeredUser=new FormGroup(
    {
      username: new FormControl("",[Validators.required, Validators.minLength(2), Validators.maxLength(20),validateUser]),
      password: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
      confirmPassword: new FormControl("",[Validators.required,passwordCheck]),
      securityQuestion: new FormControl("",[Validators.required,Validators.maxLength(50)]),
      securityAnswer: new FormControl("",[Validators.required,Validators.maxLength(50)]),
      validateUsername: new FormControl("")
    }
  )

  postApi(data:any){
    this._registerService.createUser(data).subscribe(data=>{
      this.message="Successfully created"+data.username;
      console.log(data);
      alert("Success!");
      this._router.navigate(["/Login"])
    })
  }

  checkUsername()
  {
    this.usernameAvailable=true;
    this._registerService.getUserById(this.registeredUser.controls.username.value).subscribe(response=>{
      console.log(response);
      if(response || this.registeredUser.controls.username.value=="admin"){
        this.registeredUser.controls.validateUsername.setValue(null);
        this.usernameAvailable=false;
      }
    })
  }

  
}

export function passwordCheck(control:AbstractControl):{[key:string]:boolean} | null{
  return (control.value==control.root.get("password")?.value)
  ?null:{"ValidationPassed":false};
}

function validateUser(control:AbstractControl):{[key:string]:boolean} | null{
  return (control.root.get("validateUsername")?.value===null)?null:{"ValidationPassed":false};
}