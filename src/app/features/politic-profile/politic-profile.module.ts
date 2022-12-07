import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliticProfileRoutingModule } from './politic-profile-routing.module';
import { PoliticProfileFormComponent } from './pages/politic-profile-form/politic-profile-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule } from 'o2c_core';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [PoliticProfileFormComponent],
  imports: [
    CommonModule,
    PoliticProfileRoutingModule,
    MatStepperModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class PoliticProfileModule {}
