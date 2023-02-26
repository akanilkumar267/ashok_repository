import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  userData: any = [];
  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['category_name', 'category_status', 'sort_order','Actions'];  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoriesData: LoginService) {
    

  }

  ngOnInit() {
    this.categorieslist();
  }
  ngAfterViewInit() {
    
  }
  categorieslist() {
    this.categoriesData.categeriesinfo().subscribe((dataResponse) => {
     // console.log(dataResponse);
     this.userData=dataResponse.categories;
     this.dataSource = new MatTableDataSource(this.userData);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;

    })
  }
}
