import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';

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
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilitantRoutingModule {}
