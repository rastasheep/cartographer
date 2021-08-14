import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { MappablePin, Pagination } from '@app/models';
import { PinService } from './pin.service';
import { MappablePinService } from './mappable-pin.service';

export interface ExploreState {
  pins: MappablePin[];
  pagination: Pagination;
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExploreFacadeService {
  private store = new BehaviorSubject<ExploreState>({
    pins: [],
    pagination: {
      currentPage: 0,
      pageSize: 20
    },
    loading: false
  });
  private state$ = this.store.asObservable();

  pins$ = this.state$.pipe(map(state => state.pins), distinctUntilChanged());
  pagination$ = this.state$.pipe(map(state => state.pagination), distinctUntilChanged());
  loading$ = this.state$.pipe(map(state => state.loading));

  vm$: Observable<ExploreState> = combineLatest([this.pagination$, this.pins$, this.loading$]).pipe(
    map( ([pagination, pins, loading]) => {
      return { pagination,  pins, loading };
    })
  );

  constructor(private Pin: PinService, private MappablePin: MappablePinService) {
    this.pagination$.pipe(
      switchMap(() => {
        return this.Pin.getPins();
      }),
      map((pins) => {
        return pins.map(this.MappablePin.decorate)
      })
    ).subscribe((pins) => {
      this.store.next({ ...this.store.value, pins, loading: false });
    });
  }

  updatePagination(newPagination: Partial<Pagination>) {
    const pagination = { ...this.store.value.pagination, ...newPagination };
    this.store.next({ ...this.store.value, pagination, loading: true });
  }

  updateHoverState(pin: MappablePin, hover: boolean): void {
    const options = (hover ? this.MappablePin.hoverState : this.MappablePin.decorate)(pin).options;
    const toUpdate = this.store.value.pins.find((p) => p.id === pin.id);
    if (!toUpdate) {
      return;
    }
    toUpdate.options = options;
  }
}
