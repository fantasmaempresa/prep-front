import { NgModule } from '@angular/core';

import { MilitantRoutingModule } from './militant-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MilitantListComponent } from './pages/militant-list/militant-list.component';
import { ErrorMessagesModule, ViewsModule } from 'o2c_core';

@NgModule({
  declarations: [MilitantFormComponent, MilitantListComponent],
  imports: [
    SharedModule,
    MilitantRoutingModule,
    GoogleMapsModule,
    ErrorMessagesModule,
    ViewsModule,
  ],
})
export class MilitantModule {}
