import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  profile_name:any=localStorage.getItem('first_name')

  constructor(private router:Router){

  }

  logout(){
    localStorage.setItem('user_id','');
    this.router.navigate(['/authentication']);

  }

}

