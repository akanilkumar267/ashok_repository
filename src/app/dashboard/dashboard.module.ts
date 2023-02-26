import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard1Component } from './dashboard1/dashboard1.component';

import { CategoriesComponent } from './categories/categories.component';

import { LayoutModule } from '../common/layout/layout.module';
import { AngularmaterialModule } from '../common/angularmaterial/angularmaterial.module';


@NgModule({
  declarations: [
    Dashboard1Component,
    CategoriesComponent,
   
  ],
  imports: [
    LayoutModule,
    CommonModule,
    DashboardRoutingModule,
    AngularmaterialModule,
    
    
  ]
})
export class DashboardModule { }
