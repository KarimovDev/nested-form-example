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
import { StoreService } from './services/store.service';

@Component({
  selector: 'nf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public isShowingLoadModuleIndicator = false;
  public isShowingPendingIndicator = false;

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
        this.isShowingLoadModuleIndicator = !!asyncLoadCount;
        this.ref.markForCheck();
      }
    });
  }

  ngOnInit() {
    this.appState.pendingVisibility$.subscribe(res => {
      this.isShowingPendingIndicator = res;
      this.ref.markForCheck();
    });
  }
}
