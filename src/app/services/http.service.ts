import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreData } from '@nf-shared/models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public postForm(data: StoreData): Observable<any> {
    return this.http.post<any>('/api/submit', { ...data });
  }
}
