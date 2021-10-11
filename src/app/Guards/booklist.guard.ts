import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../Services/global.service';

@Injectable({
  providedIn: 'root'
})
export class BooklistGuard implements CanActivate {

  constructor(private _global:GlobalService, private _router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._global.globalUsername=="")
    {
      this._router.navigate(["/Login"]);
      return false;
    }
    return true;
  }
  
}
