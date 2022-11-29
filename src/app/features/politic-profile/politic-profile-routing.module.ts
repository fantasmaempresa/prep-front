import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { Promoter } from '../../data/models/Promoter.model';

const routes: Routes = [
  {
    path: '',
    providers: [{ provide: VIEW_CLAZZ, useValue: Promoter }],
    component: BasicViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticProfileRoutingModule {}
