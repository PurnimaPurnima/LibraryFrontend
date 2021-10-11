import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './Services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (public global:GlobalService, private _router:Router){}

  title = 'Library';

  logout(){
    this.global.globalUsername="";
    this._router.navigate(["/Login"]);
  }

}
