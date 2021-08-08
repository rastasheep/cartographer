import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-google-maps-demo',
  templateUrl: './google-maps-demo.component.html',
  styleUrls: ['./google-maps-demo.component.scss']
})
export class GoogleMapsDemoComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  zoom = 12
  center: google.maps.LatLngLiteral = {lat: 1, lng: 1};
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
    styles: [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      }
    ]
  };

  constructor(httpClient: HttpClient) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCE5VawUOpXoMxLiN9To2CtzwT3DXWt9lU', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }
}
