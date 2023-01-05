import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './page/statistics/statistics.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SurveysComponent } from './page/surveys/surveys.component';

@NgModule({
  declarations: [StatisticsComponent, SurveysComponent],
  imports: [SharedModule, NgxChartsModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
