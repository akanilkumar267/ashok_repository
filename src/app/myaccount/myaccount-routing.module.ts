import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from '../myaccount/changepassword/changepassword.component';
import { MyprofileComponent } from '../myaccount/myprofile/myprofile.component';

const routes: Routes = [
  {path:'myprofile',component:MyprofileComponent},
  {path:'change-password',component:ChangepasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyaccountRoutingModule { }
