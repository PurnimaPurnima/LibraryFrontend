import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Books } from '../Models/book';
import { BooksService } from '../Services/books.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private _book:BooksService, private _router:Router) { }

  thumbnail:any;
  pdf:any;
  temp:string="";
  message:string="";


  createBook=new FormGroup(
    {
      title:new FormControl("",[Validators.required]),
      author:new FormControl("",[Validators.required]),
      rating:new FormControl(0,[Validators.required, Validators.max(5), Validators.min(0)]),
      thumbnail:new FormControl("",[Validators.required]),
      pdf:new FormControl("",[Validators.required]),
      imageURL:new FormControl("../assets/Images/"),
      pdfURL:new FormControl("../assets/PDFs/")
    }
  )

  ngOnInit(): void {
  }

  thumbnailUpload(event:any){
    this.thumbnail=event.target.files[0];
    this.createBook.controls.imageURL.setValue("../assets/Images/"+this.thumbnail.name);
  }

  pdfUpload(event:any){
    this.pdf=event.target.files[0];
    this.createBook.controls.pdfURL.setValue("../assets/PDFs/"+this.pdf.name);
  }

  addBook(data:any){
    
    this._book.postBook(data).subscribe(response=>{
      this.message="Successfully Created" + response.title;
      alert("Success!");
      this._router.navigate(["/Booklist"]);
    });
    
    this._book.postImage(this.thumbnail).subscribe();
    this._book.postPdf(this.pdf).subscribe();
  }

}
