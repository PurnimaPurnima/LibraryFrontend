import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './booklist/booklist.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BooklistGuard } from './Guards/booklist.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"Login", component:LoginComponent
  },
  {
    path:"PasswordReset", component: ForgotPasswordComponent
  },
  {
    path:"Booklist", component:BooklistComponent, canActivate:[BooklistGuard]
  },
  {
    path:"Register", component:RegisterComponent
  },
  {
    path:"AddBook", component:CreateBookComponent
  },
  {
    path:"*", redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
