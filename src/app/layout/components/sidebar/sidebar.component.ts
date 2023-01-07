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
        { label: 'Inicio', route: '/app/dashboard', icon: 'home' },
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
              label: 'Promotor Lista',
              route: './militant/list/promotor',
              icon: 'list',
            },
            {
              label: 'Coordinador distrital lista',
              route: './militant/list/section-responsible',
              icon: 'list',
            },
            {
              label: 'Responsable de zona lista',
              route: './militant/list/militant',
              icon: 'list',
            },
            {
              label: 'Responsable de sección lista',
              route: './militant/list/section-manager',
              icon: 'list',
            },
            {
              label: 'Activista lista',
              route: './militant/list/promoted',
              icon: 'list',
            },
            {
              label: 'Simpatizante lista',
              route: './militant/list/sympathizer',
              icon: 'list',
            },
          ],
        },
        {
          label: 'Zonas',
          icon: 'pin_drop',
          isOpen: false,
          dropdowns: [
            {
              label: 'Alta de Zona',
              route: './zone/new',
              icon: 'person_add',
            },
            {
              label: 'Lista de zonas',
              route: './zone/list',
              icon: 'list',
            },
          ],
        },
        { label: 'Mapa de Promovidos', route: './promoted-map', icon: 'maps' },
        {
          label: 'Datos estadisticos',
          icon: 'query_stats',
          isOpen: false,
          dropdowns: [
            {
              label: 'Pobreza',
              route: './statistics/poverty',
              icon: 'bar_chart',
            },
            {
              label: 'Encuestas',
              route: './statistics/survey',
              icon: 'list',
            },
          ],
        },
        { label: 'Usuarios', route: './users', icon: 'group' },
        // {
        //   label: 'Configuración',
        //   icon: 'settings',
        //   isOpen: false,
        //   dropdowns: [
        //     { label: 'Usuarios', route: './users', icon: 'person' },
        //     { label: 'Roles', route: './roles', icon: 'verified_user' },
        //   ],
        // },
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
