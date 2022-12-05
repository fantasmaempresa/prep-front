import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './page/statistics/statistics.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [SharedModule, NgxChartsModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
