import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toast:ToastrService) { }

  SuccessMessage(message:string)
  {
    this.toast.success(message, 'Success',{timeOut:20000, closeButton:true,positionClass:'toast-top-center'});
    
  }
  FailtureMessage(message:string)
  {
    this.toast.error(message, "Failure!");
  }
}
