import { DataService } from './../service/data.service';
import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      console.log(!this.db.estado.status)
    return !this.db.estado.status
  }
  constructor(private db:DataService){}
}
