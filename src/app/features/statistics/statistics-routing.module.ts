import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticsComponent } from "./page/statistics/statistics.component";
import { ZonesListComponent } from "../zones/pages/zones-list/zones-list.component";
import { ZonesFormComponent } from "../zones/pages/zones-form/zones-form.component";
import { SurveysComponent } from "./page/surveys/surveys.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'poverty',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'poverty',
        component: StatisticsComponent,
        data: { breadcrumb: 'Pobreza' },
      },
      {
        path: 'survey',
        component: SurveysComponent,
        data: { breadcrumb: 'Agregar zona' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
