import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  nameData?:string;
  Subcategory: FormGroup;
  submitted: boolean = false;
  getcategoriesdata: any;
  category_data: any;
  changeButtonName:any;
  changeLabelName:any;
  changeToasterMessage:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private subcategoryBuilder: FormBuilder,private subcategories: LoginService,private subData: LoginService, private alertservice: CommonService,public dialogref:MatDialogRef<DialogComponent>){
    this.Subcategory = this.subcategoryBuilder.group({
      sub_category_id: [this.data.subcategory_data.sub_category_id],
      subcategoryname: [this.data.subcategory_data.sub_category_name, Validators.required],
      sortorder: [this.data.subcategory_data.sort_order, Validators.required],
      category_id: [this.data.subcategory_data.category_id]
    });
  }
  get f() {
    return this.Subcategory.controls;
  }
  formSubmit() {
    this.submitted = true;
    if (this.Subcategory.invalid) {
      return;
    }
    var new_updateData = new FormData();
    new_updateData.append('sub_category_id', this.Subcategory.value.sub_category_id);
    new_updateData.append('sub_category_name', this.Subcategory.value.subcategoryname);
    new_updateData.append('category_id', this.Subcategory.value.category_id);
    new_updateData.append('sort_order', this.Subcategory.value.sortorder)
    this.subData.addsubcategoriesinfo(new_updateData).subscribe((res: any) => {

      // console.log(res);
      if (res.status == 1) {
        this.alertservice.SuccessMessage(this.changeToasterMessage);
        this.Subcategory.reset();
        this.dialogref.close();
      

      } else {
        this.alertservice.FailtureMessage("Unable to update Data");
      }
    })

  
  }
  getcategorieslist() {
    this.subcategories.categeriesinfo().subscribe((dataresponse: any) => {
      this.getcategoriesdata = dataresponse.categories;
    })
  }
  ngOnInit(){
   //this.getcategorieslist();
    this.nameData=this.data.name;
    this.category_data=this.data.category_data;
    if(this.data.action=="add"){
      this.changeLabelName='Add  New Sub Category';
      this.changeButtonName='Add New';
      this.changeToasterMessage="Data added succesfully";
    }else{
      this.changeButtonName='Update';
      this.changeLabelName='Edit Sub Category';
      this.changeToasterMessage="Data Updated succesfully"
    }
    

  }
  closeDialog(){
    this.dialogref.close();
  }

}
