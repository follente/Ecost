import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalculadoraService } from '../../services/calculadora.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardPageComponent {

  totalCO2: number = 0
  costeAbiental: number = 0
  calculosRealizados: number = 0

  constructor(private router: Router, private calculadoraService: CalculadoraService) { }

  navegar(str: string) {
    this.router.navigate(['/layout' + str])
  }

  ngOnInit() {
    this.calculadoraService.getHistoricoUser(localStorage.getItem('user')!).subscribe({
      next: (resultados) => {
        this.calculosRealizados = resultados.length
        this.costeAbiental = resultados.reduce((acc, r) => acc + r.result, 0)
        this.totalCO2 = resultados.reduce((acc, r) => {
          return acc + (r.result / r.conversionPrice);
        }, 0)

      },
      error: (err) => {
        console.error('❌ Error al obtener resultados del usuario:', err)
      }
    })
  }

}
