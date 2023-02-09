import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { logout } from '../../../state/auth/auth.actions';
import { MessageHelper } from '../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  constructor(private store: Store) {}

  changeTheme({ checked }: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }

  logout() {
    MessageHelper.decisionMessage(
      'Cerrar Sesión',
      '¿Estas seguro de cerrar la sesión?',
      () => {
        this.store.dispatch(logout());
      }
    );
  }
}
