import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../login/services/login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private _login: LoginService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (localStorage.getItem("accessToken") !== '') {
    //   return true;
    // }
    // else {
    //   return false;
    // }
    return true;
  }
}
