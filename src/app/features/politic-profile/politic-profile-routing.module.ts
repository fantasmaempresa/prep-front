import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliticProfileFormComponent } from './pages/politic-profile-form/politic-profile-form.component';

const routes: Routes = [
  {
    path: '',
    component: PoliticProfileFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticProfileRoutingModule {}
