import { NgModule } from "@angular/core";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersListComponent } from "./pages/users-list/users-list.component";
import { SharedModule } from "../../shared/shared.module";
import { ErrorMessagesModule, ViewsModule } from "o2c_core";
import { UserFormComponent } from "./pages/users-list/dialog/user-form/user-form.component";


@NgModule({
  declarations: [
    UsersListComponent,
    UserFormComponent
  ],
  imports: [
    ErrorMessagesModule,
    ViewsModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
