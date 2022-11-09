import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilitantFormComponent } from "../militant/pages/militant-form/militant-form.component";
import { DashboardComponent } from "./page/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'graphics',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'graphics',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
