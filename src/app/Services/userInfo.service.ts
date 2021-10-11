import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
//Importing both pipeable operator
import {catchError} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../Models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http:HttpClient) { }

  req:string="https://localhost:44330/api/UserInfoes"

  getUserById(id:string):Observable<UserInfo>{
    return this.http.get<UserInfo>(this.req+"/"+id);
  }

  createUser(user:any):Observable<UserInfo>{
    return this.http.post<UserInfo>(this.req,user,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  updateUser(id:string, user:UserInfo):Observable<UserInfo>{
    return this.http.put<UserInfo>(this.req+"/"+id,user,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'})
    });
  }
}
