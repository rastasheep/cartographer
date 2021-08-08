import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeolocationService } from '../../geolocation.service';
import { MapService } from '../../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  mapLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 1, lng: 1};
  options: google.maps.MapOptions;

  constructor(
    public Map: MapService,
    private Geolocation: GeolocationService
  ) {
    this.options = Map.options;
    this.mapLoaded = Map.loadApi();
  }

  ngOnInit() {
    this.Geolocation.getCurrentPosition().subscribe((center) => {
      this.center = center;
    })
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

}
