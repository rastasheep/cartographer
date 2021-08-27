import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, of, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    @Inject('Window') private window: Window
  ) { }

  getCurrentPosition(): Observable<google.maps.LatLngLiteral> {
    return Observable.create((observer: Observer<google.maps.LatLngLiteral>) => {
      if(!this.hasPositionSupport) {
        observer.error('Geolocation API not supported')
        return;
      }

      this.window.navigator.geolocation.getCurrentPosition((position) => {
        observer.next({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        observer.complete();
      },
        (error) => observer.error(error.message)
      );
    });
  }

  private get hasPositionSupport(): boolean {
    return !!this.window.navigator &&
      !!this.window.navigator.geolocation &&
      !!this.window.navigator.geolocation.getCurrentPosition
  }
}
