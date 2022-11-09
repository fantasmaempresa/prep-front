import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';
import { MilitantListComponent } from './pages/militant-list/militant-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'new',
        component: MilitantFormComponent,
        data: { breadcrumb: 'Agregar militante' },
      },
      {
        path: 'list',
        component: MilitantListComponent,
        data: { breadcrumb: 'Lista de militantes' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilitantRoutingModule {}
