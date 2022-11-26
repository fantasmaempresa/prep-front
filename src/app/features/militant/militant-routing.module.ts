import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';
import { PromotorListComponent } from './pages/promotor-list/promotor-list.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import {
  ActivistType,
  AreaManagerType,
  DistrictCoordinatorType,
  SectionManagerType,
  SympathizerType,
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
            useValue: DistrictCoordinatorType,
          },
        ],
        data: { breadcrumb: 'Lista de Coordinadores distritales' },
      },
      {
        path: 'list/militant',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: AreaManagerType,
          },
        ],
        data: { breadcrumb: 'Lista de Responsables de lista' },
      },
      {
        path: 'list/section-manager',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: SectionManagerType,
          },
        ],
        data: { breadcrumb: 'Lista de Responsable de sección' },
      },
      {
        path: 'list/promoted',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: ActivistType,
          },
        ],
        data: { breadcrumb: 'Lista de Activistas' },
      },
      {
        path: 'list/sympathizer',
        component: BasicViewComponent,
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: SympathizerType,
          },
        ],
        data: { breadcrumb: 'Lista de Simpatizantes' },
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
