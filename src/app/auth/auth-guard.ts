import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.user$.pipe(
          take(1),
          map(user => {
              if (!user) {
                  return false;
              }
              if (!user.isVerified) {
                  this.authService.redirectUri = this.router.url;
                  this.router.navigate(['/verify']);
                  return false;
              }
              return true;
          }),
          tap(isLogged => {
              if (!isLogged) {
                  this.authService.redirectUri = this.router.url;
                  this.router.navigate(['/login']);
              }
          })
      );
  }
}
