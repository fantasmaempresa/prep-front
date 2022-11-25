import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPromotedComponent } from './pages/map-promoted/map-promoted.component';

const routes: Routes = [
  {
    path: '',
    component: MapPromotedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsPromotedRoutingModule {}
