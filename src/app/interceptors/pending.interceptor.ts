import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppStateService } from '../services/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class PendingInterceptor implements HttpInterceptor {
  constructor(private appState: AppStateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('HideSpinner')) {
      this.appState.pendingInc();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (!req.headers.has('HideSpinner')) {
          this.appState.pendingDec();
        }
      })
    );
  }
}
