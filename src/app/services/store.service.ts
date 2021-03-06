import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { Store } from '@nf-shared/models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private initialState = null;
  private handlers = {
    ADD: (state, action) => ({ ...state, ...action.data }),
    DEFAULT: state => state,
  };

  public store$: Store;

  private reducer(state = this.initialState, action) {
    const handler = this.handlers[action.type] || this.handlers.DEFAULT;
    return handler(state, action);
  }

  private createStore(rootReducer) {
    const subj = new BehaviorSubject({ type: '__INIT__' });

    const store$: Store = subj
      .asObservable()
      .pipe(scan(rootReducer, undefined));

    store$.dispatch = action => subj.next(action);

    return store$;
  }

  constructor() {
    this.store$ = this.createStore(this.reducer.bind(this));
  }
}
