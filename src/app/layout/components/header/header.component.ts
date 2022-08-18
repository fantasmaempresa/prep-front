import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  changeTheme({ checked }: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }
}
