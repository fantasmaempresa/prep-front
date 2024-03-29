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
import { PeopleListComponent } from './pages/militant-list/dialogs/people-list/people-list.component';
import { BillsListComponent } from './pages/militant-list/dialogs/bills-list/bills-list.component';

@NgModule({
  declarations: [
    MilitantFormComponent,
    MilitantListComponent,
    PromotorListComponent,
    BudgetFormComponent,
    BillsFormComponent,
    ChildrenListComponent,
    PeopleListComponent,
    BillsListComponent,
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
