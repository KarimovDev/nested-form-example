import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private pendingVisibility: ReplaySubject<boolean>;
  private pendingRequests = 0;
  public pendingVisibility$: Observable<boolean>;

  constructor() {
    this.pendingVisibility = new ReplaySubject();
    this.pendingVisibility$ = this.pendingVisibility.asObservable();
  }

  private checkPending() {
    if (this.pendingRequests === 0) {
      this.pendingVisibility.next(false);
    } else {
      this.pendingVisibility.next(true);
    }
  }

  public pendingInc() {
    this.pendingRequests++;
    this.checkPending();
  }

  public pendingDec() {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
      this.checkPending();
    } else {
      console.error(`spinner counter can't be negative`);
    }
  }
}
