import { NgModule } from '@angular/core';

import { MilitantRoutingModule } from './militant-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';

@NgModule({
  declarations: [MilitantFormComponent],
  imports: [SharedModule, MilitantRoutingModule],
})
export class MilitantModule {}
