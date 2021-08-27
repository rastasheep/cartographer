import { Injectable } from '@angular/core';
import { Pin } from '@app/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor() { }

  getPins(): Observable<Pin[]> {
    return of([{
      id: 1,
      type: 1,
      title: 'Lorem ipsum',
      position: { lat: 45.277985088301904, lng: 19.860160606265698 }
    }, {
      id: 2,
      type: 1,
      title: 'Dolor sit amet',
      position: { lat: 45.29499023077311, lng: 19.742537234386234 }
    }, {
      id: 3,
      type: 1,
      title: 'Consectetur adipiscing elit, sed do eiusmod tempor',
      position: { lat: 45.229159101469875, lng: 19.782600823477086 }
    }]);
  }
}
