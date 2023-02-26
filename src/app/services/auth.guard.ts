import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  check_seeion:any;
  constructor(private router:Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.check_seeion=localStorage.getItem('user_id');
      console.log(this.check_seeion);   
      if(this.check_seeion=='' || this.check_seeion==null)
      {
        this.router.navigate(['authentication/sign-in']);
        return false;
      }else
      {
        return true;
      }
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.check_seeion=localStorage.getItem('user_id');
    console.log(this.check_seeion);   
    if(this.check_seeion=='' || this.check_seeion==null)
    {
      this.router.navigate(['authentication/sign-in']);
      return false;
    }else
    {
      return true;
    }
  }
}
