import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  page_name:string="register";
  signInGroup:FormGroup;
  formSubmit=false;
  constructor(private signInBuilder:FormBuilder,private LoginService:LoginService,private alertServie:CommonService,private router:Router){
    this.signInGroup=this.signInBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

  }
  get signData(){
    return this.signInGroup.controls;
  }
  loginFormSubmit(){
  
   this.formSubmit=true;
   //console.log(this.signInGroup.controls);
   if(this.signInGroup.invalid){
    return;
   }
   var Login_Data: any = new FormData();
   Login_Data.append('email', this.signInGroup.value.email);
   Login_Data.append('password', this.signInGroup.value.password);
   this.LoginService.Login(Login_Data).subscribe((response:any)=>{
    console.log(response);
    if(response.status==1){
      console.log(response);
      localStorage.setItem('user_id',response.user_info.user_id),
      localStorage.setItem('first_name',response.user_info.first_name),
      localStorage.setItem('email',response.user_info.email),

      this.router.navigate(['/dashboard'])
    }else
    {
     this.alertServie.FailtureMessage("Invalid Credentials");
    }

  })

}

}
