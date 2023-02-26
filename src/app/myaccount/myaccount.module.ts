import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyaccountRoutingModule } from './myaccount-routing.module';
import { AngularmaterialModule } from '../common/angularmaterial/angularmaterial.module';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LayoutModule } from '../common/layout/layout.module';


@NgModule({
  declarations: [
    MyprofileComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    MyaccountRoutingModule,
    AngularmaterialModule,
    LayoutModule
  ]
})
export class MyaccountModule { }
