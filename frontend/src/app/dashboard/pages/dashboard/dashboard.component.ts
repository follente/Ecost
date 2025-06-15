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
  costeAmbiental: number = 0
  calculosRealizados: number = 0

  chartData: any
  chartOptions: any
  resultados: any

  constructor(private router: Router, private calculadoraService: CalculadoraService) { }

  navegar(str: string) {
    this.router.navigate(['/layout' + str])
  }

  ngOnInit() {
    this.calculadoraService.getHistoricoUser(localStorage.getItem('user')!).subscribe({
      next: (resultados) => {
        this.resultados = resultados.map((r: any) => {
          const huellaCO2 = +(r.result / r.conversionPrice).toFixed(2)
          const fecha = new Date(r.date).toISOString().slice(0, 10)
          return {
            date: fecha,
            result: huellaCO2,
            costeAmbiental: +r.result.toFixed(2)
          }
        })
        this.calculosRealizados = resultados.length
        this.costeAmbiental = resultados.reduce((acc, r) => acc + r.result, 0)
        this.totalCO2 = resultados.reduce((acc, r) => {
          return acc + (r.result / r.conversionPrice);
        }, 0)
        const labels = this.resultados.map((r: { date: string | number | Date; }) => new Date(r.date).toLocaleDateString('es-ES'))
        const co2Data = this.resultados.map((r: { result: any; }) => r.result)
        const costeData = this.resultados.map((r: { costeAmbiental: any; }) => r.costeAmbiental)

        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Huella CO₂ (tCO₂e)',
              data: co2Data,
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Coste Ambiental (€)',
              data: costeData,
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              tension: 0.4,
              fill: true
            }
          ]
        };

        this.chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#4B5563',
                boxWidth: 12
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#6B7280' },
              grid: { display: false }
            },
            y: {
              ticks: { color: '#6B7280' },
              grid: {
                color: '#E5E7EB'
              }
            }
          }
        }
      },
      error: (err) => {
        console.error('❌ Error al obtener resultados del usuario:', err)
      }
    })
  }
}
