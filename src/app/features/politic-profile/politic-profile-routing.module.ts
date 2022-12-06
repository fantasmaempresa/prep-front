import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_CLAZZ, FormComponent } from 'o2c_core';
import { PowderForm } from './forms/powder.form';

const routes: Routes = [
  {
    path: '',
    providers: [{ provide: FORM_CLAZZ, useValue: PowderForm }],
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticProfileRoutingModule {}
