import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('user', user._id );
    return true;
  }


  login( email: string, password: string ): Observable<boolean> {
    const url  = `${ this.baseUrl }/user/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user }) => this.setAuthentication( user )),
        catchError( err => throwError( () => err.error.message ))
      );
  }

  register( email: string, name: string, password: string, userName: string): Observable<boolean> {
    const url  = `${ this.baseUrl }/user/register`;
    const body = { email, userName, password, name };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ( {user} ) => this.setAuthentication( user )),
        catchError( err => throwError( () => err.error.message ))
      );
  }

  checkAuthStatus():Observable<boolean> {
    const userID = localStorage.getItem('user');
    if ( !userID ) {
      this.logout();
      return of(false);
    }
    const url   = `${ this.baseUrl }/user/${ userID }`;
    return this.http.get<User>(url)
        .pipe(
          map( ( user ) => this.setAuthentication( user )),
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );
  }

  logout() {
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }

  update(password: string, userName: string): Observable<boolean> {
    const url  = `${ this.baseUrl }/user/${this.currentUser()?._id}`;
    var body = {};
    if(!(password==="") && userName===""){
      body = {password};
    }
    else if(password==="" && !(userName==="")){
      body = {userName};
    }
    else if(!(password==="") && !(userName==="")){
      body = {password, userName};
    }

    return this.http.patch<User>( url, body )
      .pipe(
        map( ( user ) => this.setAuthentication( user )),
        catchError( err => throwError( () => err.error.message ))
      );
  }
}
