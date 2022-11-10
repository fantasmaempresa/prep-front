import { viewCrud, viewHTML, viewLabel } from 'o2c_core';
import { PromoterService } from '../services/promoter.service';
import { People } from './People.model';

@viewCrud({
  classProvider: PromoterService,
  route: {
    add: '../new',
    edit: '../',
  },
  registerName: 'Promotor',
})
export class Promoter extends People {
  static ROL = [
    {
      label: 'Operador',
      value: 1,
    },
    {
      label: 'Coordinador de general',
      value: 2,
    },
    {
      label: 'Coordinador de sección',
      value: 3,
    },
    {
      label: 'Militante',
      value: 4,
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
