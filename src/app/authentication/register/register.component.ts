import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  page_name:string="sign-in";
  cities:string[]=['hyderabdad','warngal','karimnagar','nalgonda','rangareddy','vijayawada'];
  states:string[]=['telangana','andhrapradesh','bihar','tamilnadu','assam','karnataka','orissa'];
  countries:string[]=['india','nepal','pakistan','australia','srilanka','bangladesh','south africa'];
  register:FormGroup;
  submitted:boolean=false;
  isSubmitted:boolean=false;
  
  constructor(private rb:FormBuilder,private registration_service:LoginService,private alertServie:CommonService){
    this.register = this.rb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      phone:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirm_password:['',[Validators.required,Validators.minLength(6)]],
      gender:[''],
      address:['',Validators.required],
      city:['',Validators.required],
      state:[''],
      country:[''],
      check_box:['',Validators.required]
    })

  }
  get f(){
    return this.register.controls;
  }

   
  formSubmit(){
   this.submitted=true;
   this.isSubmitted=true;  
   // console.log(this.register.controls)

   if(this.register.invalid){
    return;
   }
   var new_register_Data: any = new FormData();
   new_register_Data.append('firstname', this.register.value.firstname);
   new_register_Data.append('lastname', this.register.value.lastname);
   new_register_Data.append('gender', this.register.value.gender);
   new_register_Data.append('phone', this.register.value.phone);
   new_register_Data.append('email', this.register.value.email);
   new_register_Data.append('password', this.register.value.password);
   new_register_Data.append('confirm_password', this.register.value.confirm_password);
   new_register_Data.append('address', this.register.value.address);
   new_register_Data.append('address', this.register.value.address);
   new_register_Data.append('city', this.register.value.city);
   new_register_Data.append('state', this.register.value.state);
   new_register_Data.append('country', this.register.value.country);

   console.log(new_register_Data);
   this.registration_service.PostRegisterData(new_register_Data).subscribe((response:any)=>{
    console.log(response);
    if(response.status==1)
    {
      this.alertServie.SuccessMessage("Data saved Successfully");
    }else{
      this.alertServie.FailtureMessage("Unable to save Data");
    }
   })
   
  }

  
 

}