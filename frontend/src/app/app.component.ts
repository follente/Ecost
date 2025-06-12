import { Component, computed, effect, Inject, inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``],
})
export class AppComponent {

  private authService = inject( AuthService )
  private router = inject( Router )

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        localStorage.setItem('ultimaRuta', event.urlAfterRedirects);
      })
  }



  public finishedAuthCheck = computed<boolean>( () => {
    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false
    }

    return true
  })


  public authStatusChangedEffect = effect(() => {

    switch( this.authService.authStatus() ) {

      case AuthStatus.checking:
        return

      case AuthStatus.authenticated:
        if(localStorage.getItem('ultimaRuta')){
          this.router.navigateByUrl(localStorage.getItem('ultimaRuta')!)
        }
        else{
          this.router.navigateByUrl('/layout/dashboard')
        }
        return

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/start')
        return

    }
  })


}
