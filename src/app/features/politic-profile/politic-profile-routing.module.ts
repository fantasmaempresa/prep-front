import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_CLAZZ, FormComponent } from 'o2c_core';
import { Form3 } from './forms/form3';
import { Form1 } from './forms/form1';
import { Form2 } from './forms/form2';

const routes: Routes = [
  {
    path: '',
    providers: [{ provide: FORM_CLAZZ, useValue: Form2 }],
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticProfileRoutingModule {}
