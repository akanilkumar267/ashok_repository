import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent {
  cities:string[]=['hyderabdad','warngal','karimnagar','nalgonda','rangareddy','vijayawada'];
  states:string[]=['telangana','andhrapradesh','bihar','tamilnadu','assam','karnataka','orissa'];
  countries:string[]=['india','nepal','pakistan','australia','srilanka','bangladesh','south africa'];
  register:FormGroup;
  submitted:boolean=false;
  isSubmitted:boolean=false;
  UserIno:any;
  user_id?:any;
  constructor(private rb:FormBuilder,private registration_service:LoginService,private alertServie:CommonService,private routers:Router){
    
    
    this.register = this.rb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      phone:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
   
      gender:[''],
      address:['',Validators.required],
      city:['',Validators.required],
      state:[''],
      country:['']
    })

  }

  
  ngOnInit(){
   
    this.user_id= localStorage.getItem('user_id')
    this.userInformation(this.user_id);
   }
     
   userInformation(user_id:string){
    this.registration_service.getuserinfo(user_id).subscribe((res:any)=>{
      console.log(res);
      this.UserIno=res.view_data;
      console.log(this.UserIno)
      this.register = this.rb.group({
        firstname:[this.UserIno.first_name,Validators.required],
        lastname:[this.UserIno.last_name,Validators.required],
        phone:[this.UserIno.phone,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        email:[this.UserIno.email,[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
     
        gender:[this.UserIno.gender],
        address:[this.UserIno.address,Validators.required],
        city:[this.UserIno.city,Validators.required],
        state:[this.UserIno.state],
        country:[this.UserIno.country],
        
      })
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
      new_register_Data.append('user_id', localStorage.getItem('user_id'));
      new_register_Data.append('firstname', this.register.value.firstname);
      new_register_Data.append('lastname', this.register.value.lastname);
      new_register_Data.append('gender', this.register.value.gender);
      new_register_Data.append('phone', this.register.value.phone);
      new_register_Data.append('email', this.register.value.email);
      new_register_Data.append('address', this.register.value.address); 
      new_register_Data.append('city', this.register.value.city);
      new_register_Data.append('state', this.register.value.state);
      new_register_Data.append('country', this.register.value.country);
   
      console.log(new_register_Data);
      this.registration_service.update(new_register_Data).subscribe((response:any)=>{
       console.log(response);
       if(response.status==1)
       {
         this.alertServie.SuccessMessage("Data saved Successfully");
       }else{
         this.alertServie.FailtureMessage("Unable to save Data");
       }
       this.submitted=false;
       // this.register.reset();
      })
      
     }

     cancelForm(){
      this.routers.navigate(['/dashboard']);


     }
}
