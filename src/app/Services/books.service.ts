import { Injectable } from '@angular/core';
import { Books } from '../Models/book';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  req:string="https://localhost:44330/api/Books"

  getBooks():Observable<Books[]>{
    return this.http.get<Books[]>(this.req);
  }
}
