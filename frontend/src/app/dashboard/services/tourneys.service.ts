import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { Tourney } from "../interfaces/tourney.interface";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TourneyService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  public tourneys: Tourney[] = [];

  getTourneys(): Observable<Tourney[]> {
    const url   = `${ this.baseUrl }/tourney`;
    return this.http.get<Tourney[]>(url);
  }

  enrollPlayer(userId: string, tourneyId: string) {
    const url   = `${ this.baseUrl }/tourney/${ tourneyId }/enroll`;
    const body = { userId };
    return this.http.patch<{ alreadyEnrolled: boolean; tourney: Tourney }>(url, body).pipe(
      catchError( err => throwError( () => err.error.message ))
    );
  }

  unenrollPlayer(userId: string, tourneyId: string) {
    const url = `${this.baseUrl}/tourney/${tourneyId}/unenroll`;
    const body = { userId };
    return this.http.patch<Tourney>(url, body).pipe(
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
