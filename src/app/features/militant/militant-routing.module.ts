import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';
import { MilitantListComponent } from './pages/militant-list/militant-list.component';
import { PromotorListComponent } from './pages/promotor-list/promotor-list.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import {
  GeneralCoordinateType,
  MilitantType,
  OperatorType,
  SectionCoordinateType,
} from '../../data/models/Promoter.model';

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
        path: 'list/section-responsible',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: OperatorType,
          },
        ],
        data: { breadcrumb: 'Lista de Responsables de Sección' },
      },
      {
        path: 'list/militant',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: GeneralCoordinateType,
          },
        ],
        data: { breadcrumb: 'Lista de Activista' },
      },
      {
        path: 'list/sympathizer',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: SectionCoordinateType,
          },
        ],
        data: { breadcrumb: 'Lista de Simpatizante' },
      },
      {
        path: 'list/promoted',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: MilitantType,
          },
        ],
        data: { breadcrumb: 'Lista de Promovido' },
      },
      {
        path: 'list/promotor',
        component: PromotorListComponent,
        data: { breadcrumb: 'Lista de Promotores' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilitantRoutingModule {}
