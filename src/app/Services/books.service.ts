import { Injectable } from '@angular/core';
import { Books } from '../Models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  req:string="https://localhost:44330/api/"

  getBooks():Observable<Books[]>{
    return this.http.get<Books[]>(this.req+"Books");
  }

  postBook(book:any):Observable<Books>{
    return this.http.post<Books>(this.req + "Books",book,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  postImage(file:any):Observable<any>{
    const imageData = new FormData();
    imageData.append("file",file,file.name);

    return this.http.post(this.req+"ImageUpload",imageData);
  }

  postPdf(file:any):Observable<any>{
    const pdfData = new FormData();
    
    pdfData.append("file",file,file.name);

    return this.http.post(this.req+"PdfUpload",pdfData);
  }

  deleteBookById(id:number):Observable<any>{
    return this.http.delete(this.req + "Books/" + id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
}
