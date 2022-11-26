import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsPromotedRoutingModule } from './maps-promoted-routing.module';
import { MapPromotedComponent } from './pages/map-promoted/map-promoted.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapPromotedComponent],
  imports: [
    CommonModule,
    MapsPromotedRoutingModule,
    GoogleMapsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class MapsPromotedModule {}
