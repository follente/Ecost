import { Component, inject, OnInit } from '@angular/core';
import { Tourney } from '../../interfaces/tourney.interface';
import { TourneyService } from '../../services/tourneys.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/users.service';
import { User } from 'src/app/auth/interfaces';

import { ChartConfiguration } from 'chart.js/auto';   //  <-- Chart.js 4.x

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraPageComponent implements OnInit {
  private tourneyService = inject(TourneyService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  public tourneys: Tourney[] = [];
  public players: User[] = [];

  ngOnInit(): void {
    this.getTourneys();
  }

  getEnrolledPlayersFromTourney(tourney: Tourney): void {
    this.players = [];
    tourney.enrolledPlayers.forEach((id) => {
      this.userService.getUserById(id).subscribe((data) => {
        this.players.push(data);
      })
    });
  }

  isDeadlineValid(deadlineDate: string): boolean {
    const currentDate = new Date();
    const deadlineDateFormated = new Date(deadlineDate);
    // Verifica si la fecha de inscripción es superior a la fecha actual
    return deadlineDateFormated > currentDate;
  }

  getTourneys() {
    this.tourneyService.getTourneys().subscribe((data) => {
      this.tourneys = data;
    });
  }

  enroll(i: number) {
    const userId = this.authService.currentUser()!._id;
    const tourneyId = this.tourneys[i]._id;

    this.tourneyService.enrollPlayer(userId, tourneyId).subscribe({
      next: (response) => {
        if (response.alreadyEnrolled) {
          Swal.fire('', 'Ya estás inscrito en este torneo', 'info');
        } else {
          Swal.fire('', 'Inscrito con éxito', 'success');
        }
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }

  /*------------------- Datos del formulario -----------------------*/
  activeTab = 0;
  consumption = 200;                       // kWh por defecto para demo
  energyType: 'renewable' | 'mixed' | 'fossil' = 'mixed';

  /*------------------- Resultados y gráficas -----------------------*/
  footprint = 0;
  calculated = false;

  lineChartData!: ChartConfiguration['data'];
  lineChartOptions: ChartConfiguration['options'] = {
    plugins: { legend: { display: false } }
  };

  barChartData!: ChartConfiguration['data'];
  barChartOptions: ChartConfiguration['options'] = {
    plugins: { legend: { display: false } }
  };

  /*------------------- Factores de emisión -------------------------*/
  private readonly factors: Record<string, number> = {
    renewable : 0.05,   // kg CO₂e por kWh (ejemplo)
    mixed     : 0.25,
    fossil    : 0.50
  };

  /*------------------- Lógica principal ----------------------------*/
  calculate(): void {
    this.footprint = +(this.consumption * this.factors[this.energyType]).toFixed(2);
    this.buildCharts();
    this.calculated = true;
    this.activeTab  = 1;            // cambia al tab de Resultados
  }

  /** Construye los datasets para Chart.js */
  private buildCharts(): void {
    /* Línea: solo un punto de demo */
    this.lineChartData = {
      labels: ['Ene'],
      datasets: [{
        data: [this.footprint],
        fill: false,
        tension: 0.4
      }]
    };

    /* Barras: compara los tres tipos de fuente */
    this.barChartData = {
      labels: ['Renovable', 'Mixta', 'Fósil'],
      datasets: [{
        data: [
          this.consumption * this.factors['renewable'],
          this.consumption * this.factors['mixed'],
          this.consumption * this.factors['fossil']
        ]
      }]
    };
  }

  translateEnergyType(key: string): string {
    return key === 'renewable' ? 'Renovable'
         : key === 'mixed'     ? 'Mixta'
         :                       'Fósil';
  }
}
