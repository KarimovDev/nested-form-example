import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpMockRequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    switch (request.url) {
      case '/api/submit':
        console.log(`Return from mock ${request.url}`);
        return timer(3000).pipe(
          switchMap(el =>
            of(
              new HttpResponse({
                status: 200,
                body: {
                  status: 200,
                  message: 'OK',
                },
              })
            )
          )
        );
    }
    console.log(`Return from url ${request.url}`);
    return next.handle(request);
  }
}
