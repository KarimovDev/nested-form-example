import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/services/store.service';
import { StoreData } from '@nf-shared/models';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from '@nf-shared/decorators';

@AutoUnsubscribe()
@Component({
  selector: 'nf-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  public data: StoreData;
  public keys: string[];
  private storeSubscription: Subscription;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeSubscription = this.storeService.store$.subscribe(data => {
      this.data = data;
      this.keys = Object.keys(data);
    });
  }

  isDate(value: any) {
    return value instanceof Date;
  }
}
