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
        { label: 'Inicio', route: './dashboard', icon: 'home' },
        {
          label: 'Operadores',
          icon: 'support_agent',
          isOpen: false,
          dropdowns: [
            {
              label: 'Militantes',
              route: './militant/new',
              icon: 'person_add',
            },
            {
              label: 'En Curso',
              route: './ongoing_procedure',
              icon: 'play_arrow',
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

  dropdown(submenu: never) {
    this.menus.forEach((menu) => {
      menu.submenus.forEach((subMenu) => {
        subMenu.isOpen = false;
      });
    });
    // submenu.isOpen = true;
  }

  closeSubmenu(submenu: never) {
    // submenu.isOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
