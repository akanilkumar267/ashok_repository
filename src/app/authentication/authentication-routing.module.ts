import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path:'',component:SignInComponent,canActivateChild: [AuthGuard]},
  {path:'register',component:RegisterComponent,canActivateChild: [AuthGuard]},
  {path:'sign-in',component:SignInComponent,canActivateChild: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
