import { NgModule } from '@angular/core';

import { MilitantRoutingModule } from './militant-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MilitantListComponent } from './pages/militant-list/militant-list.component';

@NgModule({
  declarations: [MilitantFormComponent, MilitantListComponent],
  imports: [SharedModule, MilitantRoutingModule, GoogleMapsModule],
})
export class MilitantModule {}
