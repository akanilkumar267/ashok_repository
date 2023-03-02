import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent {
  displayedColumns: string[] = ['sub_category_name','sort_order', 'category_name','Edit','Delete'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataResponse:any;

  constructor(private subcategories:LoginService){
   
  }
  ngOnInit(){
    this.subcategoryData();
  }
  subcategoryData(){
    this.subcategories.subcategoriesinfo().subscribe((res:any)=>{
      //console.log(res);
      this.dataResponse=res.sub_categories;
      this.dataSource = new MatTableDataSource(this.dataResponse);
      console.log(this.sort)
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  public doFilter($event: any): void{
    this.dataSource.filter = (<HTMLInputElement>$event.target).value.trim().toLocaleLowerCase();
  }
}
