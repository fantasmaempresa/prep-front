import { ViewActions, viewCrud, viewHTML, viewLabel } from 'o2c_core';
import {
  AreaManagerService,
  ActivistTypeService,
  PromoterService,
  DistrictCoordinatorService,
  SectionManagerService,
  SympathizerService,
} from '../services/promoter.service';
import { People } from './People.model';
import { PromoterDto } from '../dto/Promoter.dto';
import { MatDialog } from '@angular/material/dialog';
import { BudgetFormComponent } from '../../features/militant/pages/militant-list/dialogs/budget-form/budget-form.component';
import { BillsFormComponent } from '../../features/militant/pages/militant-list/dialogs/bills-form/bills-form.component';
import { ChildrenListComponent } from '../../features/militant/pages/militant-list/dialogs/children-list/children-list.component';

const budgetDialog = new ViewActions<PromoterDto>(
  ({ row, injector }) => {
    const dialog = injector.get(MatDialog);
    dialog.open(BudgetFormComponent, {
      data: row,
      width: '500px',
    });
  },
  'savings',
  {
    tooltip: 'Agregar presupuesto',
    color: 'primary',
    isVisible: (row) => !!row,
  }
);

const billsDialog = new ViewActions<PromoterDto>(
  ({ row, injector }) => {
    const dialog = injector.get(MatDialog);
    dialog.open(BillsFormComponent, {
      data: row,
      width: '500px',
    });
  },
  'point_of_sale',
  { tooltip: 'Agregar gastos', color: 'primary', isVisible: (row) => !!row }
);

const childrenDialog = new ViewActions<PromoterDto>(
  ({ row, injector }) => {
    const dialog = injector.get(MatDialog);
    dialog.open(ChildrenListComponent, {
      data: row,
      width: '500px',
    });
  },
  'list',
  {
    tooltip: 'Ver estructura',
    color: 'primary',
    isVisible: (row) => !!row,
  }
);

@viewCrud({
  classProvider: PromoterService,
  route: {
    add: '../new',
    edit: '../',
  },
  registerName: 'Promotor',
  actions: [budgetDialog, billsDialog],
})
export class Promoter extends People {
  static ROL = [
    {
      label: 'Coordinador distrital',
      value: 1,
    },
    {
      label: 'Responsable de zona',
      value: 2,
    },
    {
      label: 'Responsable de sección',
      value: 3,
    },
    {
      label: 'Activista',
      value: 4,
    },
    {
      label: 'Simpatizante',
      value: 5,
    },
  ];

  @viewHTML((type) => {
    const element = Promoter.ROL.find(({ value }) => value === type);
    const value = element ? element.label : 'undefined';
    return `<span style="padding: 8px 12px; background: var(--primary-color); color: white; display: block; border-radius: 8px; font-weight: 500;">${value}</span>`;
  })
  @viewLabel('Tipo')
  type: number;

  constructor(
    name: string,
    father_last_name: string,
    mother_last_name: string,
    curp: string,
    ocr: string,
    elector_key: string,
    cellphone: string,
    home_phone: string,
    email: string,
    address: string,
    type: number
  ) {
    super(
      name,
      father_last_name,
      mother_last_name,
      curp,
      ocr,
      elector_key,
      cellphone,
      home_phone,
      email,
      address
    );
    this.type = type;
  }
}

@viewCrud({
  classProvider: DistrictCoordinatorService,
  registerName: 'Coordinador distrital',
})
export class DistrictCoordinatorType extends Promoter {}

@viewCrud({
  classProvider: AreaManagerService,
  registerName: 'Responsable de zona',
  actions: [childrenDialog],
})
export class AreaManagerType extends Promoter {}

@viewCrud({
  classProvider: SectionManagerService,
  registerName: 'Responsable de sección',
  actions: [childrenDialog],
})
export class SectionManagerType extends Promoter {}

@viewCrud({
  classProvider: ActivistTypeService,
  registerName: 'Activista',
  actions: [childrenDialog],
})
export class ActivistType extends Promoter {}

@viewCrud({
  classProvider: SympathizerService,
  registerName: 'Simpatizante',
})
export class SympathizerType extends Promoter {}
