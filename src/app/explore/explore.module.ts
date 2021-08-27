import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ExploreRoutingModule } from './explore-routing.module';
import { FluidHeightDirective } from './directives/fluid-height/fluid-height.directive';
import { MapComponent } from './components/map/map.component';
import { ExploreComponent } from './containers/explore/explore.component';

@NgModule({
  declarations: [
    ExploreComponent,
    MapComponent,
    FluidHeightDirective
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    GoogleMapsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ]
})
export class ExploreModule { }
