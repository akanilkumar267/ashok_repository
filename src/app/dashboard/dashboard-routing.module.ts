import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { AuthGuard } from '../services/auth.guard';
import { SignInComponent } from '../authentication/sign-in/sign-in.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditcategoriesComponent } from './editcategories/editcategories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
const routes: Routes = [
  {path:'',component:Dashboard1Component,canActivate: [AuthGuard]},
  {path:'categories',component:CategoriesComponent},
  {path:'editcategories/:category_id',component:EditcategoriesComponent},
  {path:'subcategories',component:SubcategoriesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
