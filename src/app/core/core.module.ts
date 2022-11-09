import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './directives/autofocus.directive';
import { StopPropagationDirective } from './directives/stop-propagation.directive';

@NgModule({
  declarations: [AutofocusDirective, StopPropagationDirective],
  exports: [AutofocusDirective, StopPropagationDirective],
  imports: [CommonModule],
})
export class CoreModule {}
