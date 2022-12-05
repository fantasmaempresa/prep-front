import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/components/content-layout/content-layout.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { Promoter } from './data/models/Promoter.model';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    component: ContentLayoutComponent,
    data: { breadcrumb: 'Inicio' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'militant',
        loadChildren: () =>
          import('./features/militant/militant.module').then(
            (m) => m.MilitantModule
          ),
        data: { breadcrumb: 'Militantes' },
      },
      {
        path: 'zone',
        loadChildren: () =>
          import('./features/zones/zones.module').then((m) => m.ZonesModule),
        data: { breadcrumb: 'Zonas' },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'promoted-map',
        loadChildren: () =>
          import('./features/maps-promoted/maps-promoted.module').then(
            (m) => m.MapsPromotedModule
          ),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'politic-profile',
        data: { breadcrumb: 'Perfil Político' },
        loadChildren: () =>
          import('./features/politic-profile/politic-profile.module').then(
            (m) => m.PoliticProfileModule
          ),
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('./features/statistics/statistics.module').then(
            (m) => m.StatisticsModule
          ),
        data: { breadcrumb: 'Estadísticas' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
