import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './store/plate/plate.reducer';
import * as fromPlateSelectors from './store/plate/plate.selectors';

@Component({
  selector: 'app-plate-status',
  template: ``,
})
export class PlateStatusComponent implements OnInit, OnDestroy {
  plateData$: Observable<string>;
  private subscription!: Subscription;

  constructor(private store: Store<{ plateData: string }>) {
    this.plateData$ = this.store.select('plateData');
  }

  ngOnInit(): void {
    this.subscription = this.plateData$.subscribe((plate: any) => {
      if (plate) {
        console.log('Received Plate:', plate.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
