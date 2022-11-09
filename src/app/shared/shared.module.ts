import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from './material/material.module';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { NotificationComponent } from './components/notification/notification.component';
import { OutSideClickDirective } from './directives/out-side-click.directive';
import { FromDatePipe } from './pipes/from-date.pipe';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HttpClientModule } from '@angular/common/http';
import { MapsComponent } from './components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { WithLoadingPipe } from './pipes/with-loading.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorMessageDirective,
    NotificationComponent,
    OutSideClickDirective,
    FromDatePipe,
    MapsComponent,
    WithLoadingPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    GoogleMapsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NotificationComponent,
    BreadcrumbModule,
    ErrorMessageDirective,
    MapsComponent,
    WithLoadingPipe
  ]
})
export class SharedModule {}
