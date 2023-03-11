import { Component,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/services/login.service';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { ThemePalette } from '@angular/material/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class CoursesListComponent {
  coursesDataSource= new MatTableDataSource<any>;
  displayedColumns: string[] = ['category_name','category_status','Edit','delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  courses_info:any;
  getcategoriesdata:any;
  CouseStatus:any[] = [{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }];
  color: ThemePalette = 'primary';
  disabled: boolean = true;
  multiple: boolean = true;
  accept!: string;
  public Editor: any  = ClassicEditor; 
  selectedFiles:any;
  myfilename:any;
  imgBase64Path:any;
  imgaeData:any;
  constructor(private course_list:LoginService){

  }
  ngOnInit(){
    this.coursesList()
     this. getcouseslist()
  }
  coursesList(){
   this.course_list.cousesInfoService().subscribe((responseData:any)=>{
    //console.log(responseData);
    this.courses_info=responseData.categories;
    this.coursesDataSource= new MatTableDataSource(this.courses_info);
    this.coursesDataSource.paginator=this.paginator;
    this.coursesDataSource.sort=this.sort;
   })
  }
  getcouseslist() {
    this.course_list.categeriesinfo().subscribe((dataresponse: any) => {
      this.getcategoriesdata = dataresponse.categories;
    })
  }
  public doFilter($event: any): void {
    this.coursesDataSource.filter = (<HTMLInputElement>$event.target).value.trim().toLocaleLowerCase();
  }

  uploadFileData(fileInput:any)
  {
       console.log(fileInput.target.files);
       this.selectedFiles=fileInput.target.files[0];
       console.log(this.selectedFiles);
       if (fileInput.target.files && fileInput.target.files[0]) {


        this.myfilename = '';
        Array.from(fileInput.target.files).forEach((file: any) => {
          console.log(file);
          this.myfilename += file.name + ',';
        });
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
  
            // Return Base64 Data URL
            this.imgBase64Path = e.target.result;
            console.log(this.imgBase64Path)
  
          };
        };
        this.imgaeData=reader.readAsDataURL(fileInput.target.files[0]);
      }
       var new_register_Data: any = new FormData();
       new_register_Data.append('firstname',this.imgBase64Path);
       this.course_list.PostRegisterData(new_register_Data).subscribe((response:any)=>{
        console.log(response);
       
       })
       
  }

 


}
