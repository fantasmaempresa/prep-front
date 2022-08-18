import { Component } from '@angular/core';
import { StyleManagerService } from '../../../core/services/style-manager.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  isDark = this.styleManagerService.isDark;

  constructor(private styleManagerService: StyleManagerService) {}

  switchMode(isDarkMode: boolean) {
    console.log(isDarkMode);
    this.styleManagerService.toggleDarkTheme(isDarkMode);
    this.isDark = isDarkMode;
  }
}
