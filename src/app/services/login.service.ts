import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from  'src/app/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private registerService:HttpClient) {
  

   } 
   public PostRegisterData(register_info:any): Observable<any> {
    const url = environment.apiURL+'admin/register';
    return this.registerService.post<any>(url,register_info);
  }

  public Login(login_info:any): Observable<any> {
    const url = environment.apiURL+'admin/user_login_check';
    return this.registerService.post<any>(url,login_info);
  }

  public getuserinfo(user_id:any): Observable<any> {
    const url = environment.apiURL+'admin/get_user_info?user_id='+user_id;
    return this.registerService.get<any>(url);
  }

  public update(user_id:any): Observable<any> {
    const url = environment.apiURL+'admin/update_user';
    return this.registerService.post<any>(url,user_id);
  }

  public changePassword(user_id:any,password:any): Observable<any> {
    const url = environment.apiURL+'admin/change_password';
    return this.registerService.post<any>(url,user_id,password);
  }


}
