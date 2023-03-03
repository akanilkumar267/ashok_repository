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

  public changePassword(user_id:any): Observable<any> {
    const url = environment.apiURL+'admin/change_password';
    return this.registerService.post<any>(url,user_id);
  }

  public categeriesinfo(): Observable<any> {
    const url = environment.apiURL+'admin/categories';
    return this.registerService.get<any>(url);
  }

  public addcategoryservice(categoriesData:any): Observable<any> {
    const url = environment.apiURL+'admin/add_category';
    return this.registerService.post<any>(url,categoriesData);
  }

  public editcategoryservice(category_id:any): Observable<any> {
    const url = environment.apiURL+'admin/view_category_data?category_id='+category_id;
    return this.registerService.get<any>(url);
  }

  public updatecategoryservice(category_id:any): Observable<any> {
    const url = environment.apiURL+'admin/update_category';
    return this.registerService.post<any>(url,category_id);
  }

  public deletecategoryservice(category_id:any): Observable<any> {
    const url = environment.apiURL+'admin/delete_category?category_id='+category_id;
    return this.registerService.get<any>(url);
  }
  public subcategoriesinfo(): Observable<any> {
    const url = environment.apiURL+'admin/sub_categories';
    return this.registerService.get<any>(url);
  }

  public addsubcategoriesinfo(adding:any): Observable<any> {
    const url = environment.apiURL+'admin/add_sub_category';
    return this.registerService.post<any>(url,adding);
  }
  public deletesubcategoryservice(sub_category_id:any): Observable<any> {
    const url = environment.apiURL+'admin/delete_sub_category?sub_category_id='+sub_category_id;
        return this.registerService.get<any>(url);
  }
  


}
