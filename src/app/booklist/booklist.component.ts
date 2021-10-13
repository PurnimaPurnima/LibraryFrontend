import { Component, OnInit } from '@angular/core';
import { BooksService } from '../Services/books.service';
import { Books } from '../Models/book';
import { GlobalService } from '../Services/global.service';
import { ReadBooksService } from '../Services/read-books.service';
import { ReadBooks } from '../Models/read-books';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(private booksObj:BooksService, private _global:GlobalService, private _readBooks:ReadBooksService) { }

  isShowBook:boolean=false;
  isReadBooks:boolean=false;
  private _listFilter:string="";
  rating:number=-1;
  isAdmin:boolean=false;

  bookList:Books[]=[]
  unreadBooks:Books[]=[]
  filteredBooks:Books[]=[];

  readBook:ReadBooks={
    username:this._global.globalUsername,
    bookId:0
  }

  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter=value;
    console.log("in Setter ", value);
    if(this.isReadBooks)
      this.filteredBooks=this.performFilter(value,this.unreadBooks);
    else
      this.filteredBooks=this.performFilter(value,this.bookList);
  }

  

  /* toggleBook(){
    this.isShowBook=!this.isShowBook;
  } */

  ngOnInit(): void {
    this.booksObj.getBooks().subscribe(data=>{
      this.bookList=data;
      this.unreadBooks=this.bookList;
      if(this._global.globalUsername=="admin")
        this.isAdmin=true;

      this._readBooks.getBooks(this._global.globalUsername).subscribe(data=>{
        console.log(data);
        for(let book of data){
          for(let mainBook of this.bookList){
            if(mainBook.id==book.bookId){
              mainBook.isRead=true;
              break;
            }
          }
          this.unreadBooks=this.performReadBooksFilter(book.bookId,this.bookList);
        }

        console.log(this.unreadBooks);

        this.filteredBooks=this.bookList;
      })

    });    
  }


  performFilter(value:string, mainList:Books[]):Books[]{
    value=value.toLowerCase();
    return mainList.filter((book:Books)=>
      book.title.toLowerCase().includes(value));

  }

  performReadBooksFilter(value:number,mainList:Books[]):Books[]{
    return mainList.filter((book:Books)=>
    book.id!=value);
  }

  onRatingClicked(message:number){
    this.rating=message;
  }

  resetRating(){
    this.rating=-1;
  }

  unreadList(){
    if(this.isReadBooks){
      this.isReadBooks=false;
      this.filteredBooks=this.performFilter(this.listFilter,this.bookList);
    }
    else{
      this.isReadBooks=true;
      this.filteredBooks=this.performFilter(this.listFilter,this.unreadBooks);
    }
  }

  markUnread(value:Books){
    value.isRead=false;
    this._readBooks.deleteBook(this._global.globalUsername, value.id).subscribe();
    this.unreadBooks.push(value);
    this.unreadBooks.sort((a,b)=>a.id<b.id?-1:1);
  }

  markRead(value:Books){
    value.isRead=true;
    this.readBook.bookId=value.id;
    this._readBooks.postBook(this.readBook).subscribe();
    this.unreadBooks=this.performReadBooksFilter(value.id,this.unreadBooks);
  }

  deleteBook(data:any){
    console.log(data);
    this.bookList=this.performReadBooksFilter(data.id,this.bookList);
    this.filteredBooks=this.performFilter(this.listFilter,this.bookList);
    this.booksObj.deleteBookById(data.id).subscribe();
  }

}