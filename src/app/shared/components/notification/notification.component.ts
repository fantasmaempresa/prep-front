import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  isOpened = false;

  notifications$!: Observable<never>;

  numberNotification$!: Observable<never>;

  toggleContainer() {
    this.isOpened = !this.isOpened;

    if (!this.isOpened) {
      console.log('dispatch store');
      // this.store.dispatch(readAllNotificationsServer());
    }
  }

  toggleClose = () => {
    if (this.isOpened) {
      this.isOpened = false;
      console.log('dispatch store');
      // this.store.dispatch(readAllNotificationsServer());
    }
  };
}
