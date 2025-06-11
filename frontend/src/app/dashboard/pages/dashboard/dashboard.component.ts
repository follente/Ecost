import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardPageComponent {

  constructor(private router: Router) {}

  navegar(str: string){
    this.router.navigate(['/layout' + str])
  }
  
 }
