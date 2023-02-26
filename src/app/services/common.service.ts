import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toast:ToastrService) { }

  SuccessMessage(message:string)
  {
    this.toast.success(message, 'Success');
  }
  FailtureMessage(message:string)
  {
    this.toast.error(message, "Failure!");
  }
}
