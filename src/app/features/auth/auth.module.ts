import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, AuthRoutingModule, CoreModule],
})
export class AuthModule {}
