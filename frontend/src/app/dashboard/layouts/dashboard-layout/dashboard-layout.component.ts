import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  public user = computed(() => this.authService.currentUser() )
  public rutaActiva = ''

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(){
    this.router.events.subscribe(() => {
      this.rutaActiva = this.router.url
    })
  }

  get userName() {
    return this.user()?.userName ?? 'Unknown'
  }

  navegar(str: string){
    this.router.navigate(['/layout' + str])
    this.rutaActiva = str
  }

  esRutaActiva(ruta: string): boolean {
    return this.rutaActiva.includes(ruta)
  }

}
