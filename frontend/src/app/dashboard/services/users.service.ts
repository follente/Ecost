import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { Tourney } from "../interfaces/tourney.interface";
import { Observable } from "rxjs";
import { User } from "src/app/auth/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  public tourneys: Tourney[] = [];

  getUsers(): Observable<User[]> {
    const url   = `${ this.baseUrl }/user`;
    return this.http.get<User[]>(url);
  }

  getUserById(id: string): Observable<User> {
    const url   = `${ this.baseUrl }/user/${id}`;
    return this.http.get<User>(url);
  }
}
