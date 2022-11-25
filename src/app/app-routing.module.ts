import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/components/content-layout/content-layout.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
