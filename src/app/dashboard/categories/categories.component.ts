import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  userData: any = [];
  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['category_name', 'category_status', 'sort_order', 'Actions'];
  addcategory: FormGroup;
  submitted: boolean = false;
  ishideform: boolean = false;
  categoryStatus: any[] = [{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoriesData: LoginService, private category: FormBuilder, private alertServie: CommonService) {
    this.addcategory = this.category.group({
      categoryname: ['', Validators.required],
      categoryStatus: ['', Validators.required],
      categorysortorder: ['', Validators.required]
    })
  }
  get f() {
    return this.addcategory.controls;
  }
  categoryFormSubmit() {
    this.submitted = true;
    if (this.addcategory.invalid) {
      return;
    }
    var new_category: any = new FormData();
    new_category.append('category_id', '');
    new_category.append('category_name', this.addcategory.value.categoryname);
    new_category.append('category_status', this.addcategory.value.categoryStatus);
    new_category.append('sort_order', this.addcategory.value.categorysortorder);
    this.categoriesData.addcategoryservice(new_category).subscribe((response: any) => {
      console.log(response);
      if (response.status == 1) {
        this.alertServie.SuccessMessage("Data added Successfully");
        this.submitted=false;
        this.addcategory.reset();
        this.ishideform=false;
        this.categorieslist();
      } else {
        this.alertServie.FailtureMessage("Unable to add Data");
      }
    })
  }

  


  ngOnInit() {
    this.categorieslist();
    
  }
  // ngAfterViewInit() {

  // }
  categorieslist() {
    this.categoriesData.categeriesinfo().subscribe((dataResponse) => {
      // console.log(dataResponse);
      this.userData = dataResponse.categories;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }
  
  removeRow(category_id:string){
  
    this.categoriesData.deletecategoryservice(category_id).subscribe((res:any)=>{
     console.log(res);
      if(res.status==1){
          this.alertServie.SuccessMessage("Data deleted Successfully");
          this.categorieslist();

      }else{
        this.alertServie.FailtureMessage("Unable to delete the Data");
      }
      });

    }}

  