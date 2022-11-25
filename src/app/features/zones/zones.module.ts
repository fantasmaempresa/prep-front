import { NgModule } from "@angular/core";

import { ZonesRoutingModule } from "./zones-routing.module";
import { ZonesListComponent } from "./pages/zones-list/zones-list.component";
import { ZonesFormComponent } from "./pages/zones-form/zones-form.component";
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule } from "o2c_core";

@NgModule({
  declarations: [
    ZonesListComponent,
    ZonesFormComponent
  ],
  imports: [
    SharedModule,
    ZonesRoutingModule,
    ViewsModule
  ]
})
export class ZonesModule { }
