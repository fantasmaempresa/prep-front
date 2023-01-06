import { formField, FormFieldType, viewLabel } from 'o2c_core';

export class ActorsOfProblemForm {
  @formField({
    label: 'Nombre',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Nombre')
  name: string;

  @formField({
    label: 'Domicilio',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Domicilio')
  address: string;

  @formField({
    label: 'Ocupación',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Ocupación')
  field1: string;

  @formField({
    label: 'Organización o Partido Politico',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Organización o Partido Politico')
  field2: string;

  constructor(name: string, address: string, field1: string, field2: string) {
    this.name = name;
    this.address = address;
    this.field1 = field1;
    this.field2 = field2;
  }
}
