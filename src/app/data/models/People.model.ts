import { viewCrud, viewLabel } from 'o2c_core';
import { Promoter } from './Promoter.model';
import { PeopleService } from '../services/people.service';

@viewCrud({
  classProvider: PeopleService,
  route: {
    add: '../new',
    edit: '../',
  },
  registerName: 'Militante',
})
export class People {
  @viewLabel('Nombre')
  name: string;
  @viewLabel('Apellido Paterno')
  father_last_name: string;
  @viewLabel('Apellido Materno')
  mother_last_name: string;
  @viewLabel('CURP')
  curp: string;
  @viewLabel('OCR')
  ocr: string;
  @viewLabel('Clave de Elector')
  elector_key: string;
  @viewLabel('Celular')
  cellphone: string;
  @viewLabel('Tel. Casa')
  home_phone: string;
  @viewLabel('Correo')
  email: string;
  @viewLabel('Dirección')
  address: string;

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
    address: string
  ) {
    this.name = name;
    this.father_last_name = father_last_name;
    this.mother_last_name = mother_last_name;
    this.curp = curp;
    this.ocr = ocr;
    this.elector_key = elector_key;
    this.cellphone = cellphone;
    this.home_phone = home_phone;
    this.email = email;
    this.address = address;
  }
}
