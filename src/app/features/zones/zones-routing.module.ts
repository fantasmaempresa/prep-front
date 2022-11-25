import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesListComponent } from './pages/zones-list/zones-list.component';
import { ZonesFormComponent } from './pages/zones-form/zones-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ZonesListComponent,
        data: { breadcrumb: 'Lista de zonas' },
      },
      {
        path: 'new',
        component: ZonesFormComponent,
        data: { breadcrumb: 'Agregar zona' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonesRoutingModule {}
