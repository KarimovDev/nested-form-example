import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { AppStateService } from './services/app-state.service';
import {
  Router,
  RouterEvent,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from '@nf-shared/decorators';
import { StoreService } from './services/store.service';

@AutoUnsubscribe()
@Component({
  selector: 'nf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  public isShowingLoadIndicator: boolean;
  private currPendingVisibilityStatus: Subscription;
  private storeInitialSubscription: Subscription;

  constructor(
    private appState: AppStateService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService
  ) {
    let asyncLoadCount = 0;

    router.events.subscribe((event: RouterEvent): void => {
      if (event instanceof RouteConfigLoadStart) {
        asyncLoadCount++;
      } else if (event instanceof RouteConfigLoadEnd) {
        asyncLoadCount--;
      }

      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof RouteConfigLoadEnd
      ) {
        this.isShowingLoadIndicator = !!asyncLoadCount;
        this.ref.markForCheck();
      }
    });
  }

  ngOnInit() {
    this.storeInitialSubscription = this.storeService.store$.subscribe();
    this.currPendingVisibilityStatus = this.appState.pendingVisibility$.subscribe(
      res => {
        this.isShowingLoadIndicator = res;
        this.ref.markForCheck();
      }
    );
  }
}
