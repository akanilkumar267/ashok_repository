import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent {

  //code related to display table
  displayedColumns: string[] = ['select','sub_category_name', 'sort_order', 'category_name', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataResponse: any;
  //code related to add button
  Subcategory: FormGroup;
  submitted: boolean = false;
  ishideForm: boolean = false;
  getcategoriesdata: any;
  selection = new SelectionModel<any>(true, []);
  changeLabel:string="Add Category";
  constructor(private subcategories: LoginService, private subcategoryBuilder: FormBuilder, private subData: LoginService, private alertservice: CommonService) {
    this.Subcategory = this.subcategoryBuilder.group({
      sub_category_id: [''],
      subcategoryname: ['', Validators.required],
      sortorder: ['', Validators.required],
      category_id: ['']
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
        this.alertservice.SuccessMessage("Data updated Successfully");
        this.subcategoryData();
        this.Subcategory.reset();
        this.ishideForm = false;

      } else {
        this.alertservice.FailtureMessage("Unable to update Data");
      }
    })

  }


  ngOnInit() {
    this.subcategoryData();
    this.getcategorieslist()
  }
  subcategoryData() {
    this.subcategories.subcategoriesinfo().subscribe((res: any) => {
      //console.log(res);
      this.dataResponse = res.sub_categories;
      this.dataSource = new MatTableDataSource(this.dataResponse);
      console.log(this.sort)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     this. selection = new SelectionModel(this.dataResponse);
    })

  }
  getcategorieslist() {
    this.subcategories.categeriesinfo().subscribe((dataresponse: any) => {
      this.getcategoriesdata = dataresponse.categories;
    })
  }

  public doFilter($event: any): void {
    this.dataSource.filter = (<HTMLInputElement>$event.target).value.trim().toLocaleLowerCase();
  }
  deletedata(sub_category_id: string) {
    if(confirm('Are you sure want to delete?'))
    {
      this.subData.deletesubcategoryservice(sub_category_id).subscribe((response: any) => {
        // console.log(response)
        if (response.status == 1) {
          this.subcategoryData();
  
        }
      });
    }
    

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    console.log('checkbox',numSelected)
    const numRows = this.dataSource.data.length;
    console.log('datasource',numRows)
    return numSelected === numRows;
  }

  masterToggle() {
    console.log(this.isAllSelected())
    this.isAllSelected() ?
        this.selection.clear() :        
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  addNew()
  {
    this.ishideForm =!this.ishideForm;
    this.Subcategory.reset();
    this.changeLabel="Add Category";
  }
   editSubCategory(sub_cat_data:any){
    this.ishideForm = true;
    this.Subcategory = this.subcategoryBuilder.group({
      sub_category_id: [sub_cat_data.sub_category_id],
      subcategoryname: [sub_cat_data.sub_category_name, Validators.required],
      sortorder: [sub_cat_data.sort_order, Validators.required],
      category_id: [sub_cat_data.category_id]
      
    });
    this.changeLabel="Update Category";

   }
   

}
