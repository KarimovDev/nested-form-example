import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  UrlSegment,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}

  public canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | boolean {
    return of(true).pipe(
      take(1),
      map((res: boolean) => {
        if (res) {
          return true;
        }

        this.router.navigate(['']);

        return false;
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardActivate implements CanActivate {
  constructor(private router: Router) {}

  public canActivate(
    route: Route,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return of(true).pipe(
      take(1),
      map((res: boolean) => {
        if (res) {
          return true;
        }

        this.router.navigate(['']);

        return false;
      })
    );
  }
}
