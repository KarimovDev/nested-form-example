import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan, startWith, shareReplay } from 'rxjs/operators';

interface Store extends Observable<any> {
  dispatch?: any;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private initialState = null;
  private handlers = {
    ADD: (state, action) => ({ ...action.data }),
    DEFAULT: state => state,
  };

  public store$: Store;

  private reducer(state = this.initialState, action) {
    const handler = this.handlers[action.type] || this.handlers.DEFAULT;
    return handler(state, action);
  }

  private createStore(rootReducer) {
    const subj = new Subject();

    const store$: Store = subj.pipe(
      startWith({ type: '__INIT__' }),
      scan(rootReducer, undefined),
      shareReplay(1)
    );

    store$.dispatch = action => subj.next(action);

    return store$;
  }

  constructor() {
    this.store$ = this.createStore(this.reducer);
  }
}

// document.getElementById('add').addEventListener('click', () => {
//   store$.dispatch({type: 'ADD', payload: 10})
// })
