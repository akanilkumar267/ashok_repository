import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-editcategories',
  templateUrl: './editcategories.component.html',
  styleUrls: ['./editcategories.component.scss']
})
export class EditcategoriesComponent {
  categoryStatus: any[] = [{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }];
  editcategory:FormGroup;
  submitted:boolean=false;
  category_id:any;
  editCategoryinfo:any;
  constructor(private category:FormBuilder,private editData:LoginService,private route:ActivatedRoute,private alertServie:CommonService,private routers:Router) {
    this.editcategory=this.category.group({
      categoryid:[''],
      categoryname:['',Validators.required],
      categoryStatus:['',Validators.required],
      sortorder:['',Validators.required],
      
      });
    }
    get f(){
      return this.editcategory.controls;
    }
    

    updateFormSubmit(){
      this.submitted=true;
      if(this.editcategory.invalid){
        return
      }
      var new_updateData=new FormData();
      new_updateData.append('category_id',this.editcategory.value.categoryid);
      new_updateData.append('category_name',this.editcategory.value.categoryname);
      new_updateData.append('category_status',this.editcategory.value.categoryStatus);
      new_updateData.append('sort_order',this.editcategory.value.sortorder)

      this.editData.updatecategoryservice(new_updateData).subscribe((res:any)=>{
        if(res.status==1){
          this.alertServie.SuccessMessage("Data updated Successfully");
          this.routers.navigate(['/dashboard/categories'])

        }else{
          this.alertServie.FailtureMessage("Unable to update Data");
        }
      })
      
    }

    ngOnInit(){
      
      this.route.params.subscribe(params => {        
        this.category_id = params['category_id'];
        console.log( this.category_id);
        
      });
      
      this.editCategoriesInformation(this.category_id);
    }
    editCategoriesInformation(category_id:string){
      this.editData.editcategoryservice(category_id).subscribe((data:any)=>{
        console.log(data);
       this.editCategoryinfo=data.view_data;
       this.editcategory=this.category.group({
        categoryid:[this.editCategoryinfo.category_id],
        categoryname:[this.editCategoryinfo.category_name,Validators.required],
        categoryStatus:[this.editCategoryinfo.category_status,Validators.required],
        sortorder:[this.editCategoryinfo.sort_order,Validators.required],
        
        });

      })
    }
    
    cancelform(){
      this.routers.navigate(['/dashboard/categories']);
    }

}
