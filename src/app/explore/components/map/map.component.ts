import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { GeolocationService } from '../../services/geolocation.service';
import { MapService } from '../../services/map.service';
import { LatLngLiteral, MapOptions, MappablePin } from '@app/models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  mapLoaded: Observable<boolean>;
  center: LatLngLiteral = {lat: 1, lng: 1};
  options: MapOptions;

  @Input() pins: MappablePin[] = [];
  @Output() pinMouseover = new EventEmitter<MappablePin>()
  @Output() pinMouseout = new EventEmitter<MappablePin>()

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

  mapClickPin(pin: MappablePin) {
    console.log(pin);
  }

  mapMouseoverPin(pin: MappablePin) {
    this.pinMouseover.emit(pin);
  }

  mapMouseoutPin(pin: MappablePin) {
    this.pinMouseout.emit(pin);
  }
}
