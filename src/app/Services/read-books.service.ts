import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadBooks } from '../Models/read-books';

@Injectable({
  providedIn: 'root'
})
export class ReadBooksService {

  constructor(private http:HttpClient) { }

  req:string="https://localhost:44330/api/ReadBooks"

  getBooks(name:string):Observable<ReadBooks[]>{
    return this.http.get<ReadBooks[]>(this.req+"/name?name="+name);
  }

  deleteBook(name:string, id:number):Observable<ReadBooks>{
    return this.http.delete<ReadBooks>(this.req + "/" + name + "/" + id);
  }

  postBook(book:ReadBooks):Observable<ReadBooks>{
    return this.http.post<ReadBooks>(this.req,book,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
}
