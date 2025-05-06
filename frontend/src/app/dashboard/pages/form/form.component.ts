import { Component, inject, OnInit } from '@angular/core';
import { Tourney } from '../../interfaces/tourney.interface';
import { TourneyService } from '../../services/tourneys.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/users.service';
import { User } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormPageComponent implements OnInit {
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
}
