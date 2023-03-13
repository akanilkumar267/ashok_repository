import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
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
  @ViewChild('TABLE') table!: ElementRef;
  dataResponse: any;
  //code related to add button
  Subcategory: FormGroup;
  submitted: boolean = false;
  ishideForm: boolean = false;
  getcategoriesdata: any;
  selection = new SelectionModel<any>(true, []);
  changeLabel:string="Add Category";
 
  constructor(private subcategories: LoginService, private subcategoryBuilder: FormBuilder, private subData: LoginService, private alertservice: CommonService,private dialog: MatDialog) {
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
    const openmodal=this.dialog.open(DeletedialogComponent, {
      height: '150px',
      width: '300px',
      data: {       
       sub_category_id_data:sub_category_id

      }
    });
    openmodal.afterClosed().subscribe(res=>{
      this.subcategoryData();

    });
    
   
    

  }
  allDeleteData(){
    const deleteArray=<any>[];
    this.selection.selected.forEach(item=>{
      deleteArray.push(item.sub_category_id);
     
    })
    console.log(deleteArray)
    this.subData.deletesubcategoryservice(deleteArray).subscribe((response: any) => {
      // console.log(response)
      if (response.status == 1) {
        this.subcategoryData();

      }
    });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
  }

  masterToggle() {
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
   exportAsExcel()
    {
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'SheetJS.csv');

    }
    popUp(){

      const openmodal=this.dialog.open(DialogComponent, {
        height: '400px',
        width: '600px',
        data: {
         name:"raghu",
         category_data:this.getcategoriesdata,
         subcategory_data:'',
         action:'add',
         

        }
      });
      openmodal.afterClosed().subscribe(res=>{
        this.subcategoryData();

      });
    }
    editDilog(row:any){
      console.log(row);
      const openmodal=this.dialog.open(DialogComponent, {
        height: '400px',
        width: '600px',
        data: {
         name:"raghu",
         category_data:this.getcategoriesdata,
         subcategory_data:row,
         action:'edit',


        }
      });
      openmodal.afterClosed().subscribe(res=>{
        this.subcategoryData();

      });

    }
   

}
