import { Component } from '@angular/core';
import { CalculadoraService } from '../../services/calculadora.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styles: ``,
})
export class HistoricoPageComponent {
  
  constructor(private calculadoraService: CalculadoraService){}

  public data: any = []

  ngOnInit(){
      this.calculadoraService.getHistoricoUser(localStorage.getItem('user')!).subscribe({
      next: (resultados) => {
        this.data = resultados
      },
      error: (err) => {
        console.error('❌ Error al obtener resultados del usuario:', err)
      }
    })
  }

  eliminar(resultado: any) {
    this.calculadoraService.eliminarHistorico(resultado._id).subscribe({
    next: () => {
      this.data = this.data.filter((r: { _id: any; }) => r._id !== resultado._id)
    },
    error: (err) => {
      console.error('❌ Error al eliminar resultado:', err)
    }
  });
  }
}
