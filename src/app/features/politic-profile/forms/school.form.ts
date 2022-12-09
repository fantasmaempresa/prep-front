import { formField, FormFieldType, FormOption } from 'o2c_core';

export class SchoolForm {
  @formField({
    label: 'Nombre',
    formFieldType: FormFieldType.TEXT,
  })
  politic_party: string;

  @formField({
    label: 'Clave Escolar',
    formFieldType: FormFieldType.TEXT,
  })
  charge: string;

  @formField({
    label: 'Turno',
    formFieldType: FormFieldType.RADIO,
    options: [
      new FormOption('Matutino', 1),
      new FormOption('Vespertino', 2),
      new FormOption('Nocturno', 3),
    ],
  })
  name: string;

  @formField({
    label: 'Número de Alumnos',
    formFieldType: FormFieldType.NUMBER,
  })
  address: string;

  constructor(
    politic_party: string,
    charge: string,
    name: string,
    address: string
  ) {
    this.politic_party = politic_party;
    this.charge = charge;
    this.name = name;
    this.address = address;
  }
}
