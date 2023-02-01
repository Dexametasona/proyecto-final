import { DataService } from './../service/data.service';
import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return true
  }
  constructor(private db:DataService){}
  
}
