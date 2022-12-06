import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliticProfileRoutingModule } from './politic-profile-routing.module';
import { PoliticProfileFormComponent } from './pages/politic-profile-form/politic-profile-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule } from 'o2c_core';

@NgModule({
  declarations: [PoliticProfileFormComponent],
  imports: [
    CommonModule,
    PoliticProfileRoutingModule,
    MatStepperModule,
    FormsModule,
  ],
})
export class PoliticProfileModule {}
