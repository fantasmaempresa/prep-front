import {
  RechargeComponentService,
  ViewActions,
  viewCrud,
  viewLabel,
} from 'o2c_core';
import { ZoneService } from '../services/zone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneDto, ZoneStatus } from '../dto/Zone.dto';
import { MessageHelper } from '../../shared/helpers/MessageHelper';

@viewCrud({
  classProvider: ZoneService,
  route: {
    add: '../new',
    edit: '../',
  },
  registerName: 'Zona',
  actions: [
    new ViewActions(
      async ({ row, injector }) => {
        const router = injector.get(Router);
        const route = injector.get(ActivatedRoute);
        await router.navigate(['../', (row as ZoneDto).id, 'politic-profile'], {
          relativeTo: route,
        });
      },
      'feed',
      {
        isVisible: (zone: ZoneDto) =>
          !!zone && zone.locked === ZoneStatus.UNLOCKED,
      }
    ),
    new ViewActions(
      async ({ row, injector }) => {
        const zoneService = injector.get(ZoneService);
        const rechargeComponentService = injector.get(RechargeComponentService);
        MessageHelper.showLoading('Espera...');
        zoneService.lockedPoliticalProfile((row as ZoneDto).id).subscribe({
          next: () => {
            MessageHelper.successMessage('Éxito', 'Se ha bloqueado la zona');
            rechargeComponentService.reloadPage();
          },
          complete: () => {
            MessageHelper.hide();
          },
        });
      },
      'lock',
      {
        isVisible: (zone: ZoneDto) =>
          !!zone && zone.locked === ZoneStatus.UNLOCKED,
        tooltip: 'Bloquear Perfil Politico',
      }
    ),
    new ViewActions(
      async ({ row, injector }) => {
        const zoneService = injector.get(ZoneService);
        const rechargeComponentService = injector.get(RechargeComponentService);
        MessageHelper.showLoading('Espera...');
        zoneService.unlockedPoliticalProfile((row as ZoneDto).id).subscribe({
          next: () => {
            MessageHelper.successMessage('Éxito', 'Se ha desbloqueado la zona');
            rechargeComponentService.reloadPage();
          },
          complete: () => MessageHelper.hide(),
        });
      },
      'lock_open',
      {
        isVisible: (zone: ZoneDto) =>
          !!zone && zone.locked === ZoneStatus.LOCKED,
        tooltip: 'Desbloquear Perfil Politico',
      }
    ),
  ],
})
export class Zone {
  id: number;
  @viewLabel('Nombre')
  name: string;
  @viewLabel('Descripción')
  description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
