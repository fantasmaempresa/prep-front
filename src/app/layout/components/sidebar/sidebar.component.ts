import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menus = [
    {
      menuName: 'Menu',
      submenus: [
        { label: 'Inicio', route: '/app', icon: 'home' },
        {
          label: 'Operadores',
          icon: 'support_agent',
          isOpen: false,
          dropdowns: [
            {
              label: 'Militantes Alta',
              route: './militant/new',
              icon: 'person_add',
            },
            {
              label: 'Militantes Lista',
              route: './militant/list',
              icon: 'list',
            },
          ],
        },
        {
          label: 'Configuración',
          icon: 'settings',
          isOpen: false,
          dropdowns: [
            { label: 'Usuarios', route: './users', icon: 'person' },
            { label: 'Roles', route: './roles', icon: 'verified_user' },
          ],
        },
      ],
    },
  ];

  constructor() {}

  dropdown(submenu: any) {
    this.menus.forEach((menu) => {
      menu.submenus.forEach((subMenu) => {
        subMenu.isOpen = false;
      });
    });
    submenu.isOpen = true;
  }

  closeSubmenu(submenu: any) {
    submenu.isOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
