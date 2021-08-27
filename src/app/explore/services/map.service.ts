import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@app/../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly mapsApi = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;

  constructor(private httpClient: HttpClient) { }

  get options(): google.maps.MapOptions {
    return {
      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      maxZoom: 15,
      minZoom: 8,
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          stylers: [
            { visibility: "off" }
          ]
        }
      ]
    }
  }

  loadApi(): Observable<boolean> {
    return this.httpClient
      .jsonp(this.mapsApi, 'callback')
      .pipe(
        map<Object, boolean>(() => true),
        catchError(() => of(false)),
      );
  }
}
