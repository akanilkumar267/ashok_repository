import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fake',
  templateUrl: './fake.component.html',
  styleUrls: ['./fake.component.scss']
})
export class FakeComponent {
  cities:string[]=['hyderabdad','warngal','karimnagar','nalgonda','rangareddy','vijayawada'];
  states:string[]=['telangana','andhrapradesh','bihar','tamilnadu','assam','karnataka','orissa'];
  countries:string[]=['india','nepal','pakistan','australia','srilanka','bangladesh','south africa'];
  
  
  register:FormGroup;
  submitted:boolean=false;
  constructor(private rb:FormBuilder){
    this.register = this.rb.group({
      firstname:['',Validators.required]
    })

  }
  get f(){
    return this.register.controls;
  }
  formSubmit(){
   this.submitted=true;


  }


}
