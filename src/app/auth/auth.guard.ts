import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  UrlSegment,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { StoreService } from 'app/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private storeService: StoreService) {}

  public canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | boolean {
    return this.storeService.store$.pipe(
      take(1),
      map(res => {
        if (!res) {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardActivate implements CanActivate {
  constructor(private router: Router, private storeService: StoreService) {}

  public canActivate(
    route: Route,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.storeService.store$.pipe(
      take(1),
      map(res => {
        if (!res) {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
