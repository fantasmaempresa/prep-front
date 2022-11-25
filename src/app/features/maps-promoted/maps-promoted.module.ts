import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsPromotedRoutingModule } from './maps-promoted-routing.module';
import { MapPromotedComponent } from './pages/map-promoted/map-promoted.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [MapPromotedComponent],
  imports: [CommonModule, MapsPromotedRoutingModule, GoogleMapsModule],
})
export class MapsPromotedModule {}
