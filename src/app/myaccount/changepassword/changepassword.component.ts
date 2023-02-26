import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  register:FormGroup;
  submitted:boolean=false;

  constructor(private rb:FormBuilder,private registration_service:LoginService,private alertServie:CommonService){
    this.register = this.rb.group({
     
      password:['',[Validators.required,Validators.minLength(6)]],
      confirm_password:['',[Validators.required,Validators.minLength(6)]],
    })

  }
  get f(){
    return this.register.controls;
  }

 
  formSubmit(){
   this.submitted=true;
   

   if(this.register.invalid){
    return;
   }
   var new_password: any = new FormData();
   new_password.append('user_id',localStorage.getItem('user_id'));
   new_password.append('password', this.register.value.password);
   
  

   //console.log(new_password);
   this.registration_service.changePassword(new_password).subscribe((response:any)=>{
    console.log(response);
    if(response.status==1)
    {
      this.alertServie.SuccessMessage("New password updated succesfully");
    }else{
      this.alertServie.FailtureMessage("Unable to update new password");
    }
   })
   
  }


}
