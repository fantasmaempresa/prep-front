import { NgModule } from '@angular/core';

import { MilitantRoutingModule } from './militant-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MilitantFormComponent } from './pages/militant-form/militant-form.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MilitantListComponent } from './pages/militant-list/militant-list.component';
import { ErrorMessagesModule, ViewsModule } from 'o2c_core';
import { PromotorListComponent } from './pages/promotor-list/promotor-list.component';
import { BudgetFormComponent } from './pages/militant-list/dialogs/budget-form/budget-form.component';
import { BillsFormComponent } from './pages/militant-list/dialogs/bills-form/bills-form.component';
import { ChildrenListComponent } from './pages/militant-list/dialogs/children-list/children-list.component';

@NgModule({
  declarations: [
    MilitantFormComponent,
    MilitantListComponent,
    PromotorListComponent,
    BudgetFormComponent,
    BillsFormComponent,
    ChildrenListComponent,
  ],
  imports: [
    SharedModule,
    MilitantRoutingModule,
    GoogleMapsModule,
    ErrorMessagesModule,
    ViewsModule,
  ],
})
export class MilitantModule {}
