import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard1Component } from './dashboard1/dashboard1.component';

import { CategoriesComponent } from './categories/categories.component';

import { LayoutModule } from '../common/layout/layout.module';
import { AngularmaterialModule } from '../common/angularmaterial/angularmaterial.module';
import { EditcategoriesComponent } from './editcategories/editcategories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';


@NgModule({
  declarations: [
    Dashboard1Component,
    CategoriesComponent,
    EditcategoriesComponent,
    SubcategoriesComponent,
    CoursesListComponent,
    DialogComponent,
    DeletedialogComponent,
   
  ],
  imports: [
    LayoutModule,
    CommonModule,
    DashboardRoutingModule,
    AngularmaterialModule,
    
    
  ]
})
export class DashboardModule { }
