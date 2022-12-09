import { formField, FormFieldType } from 'o2c_core';

export class ActorsOfProblemForm {
  @formField({
    label: 'Nombre',
    formFieldType: FormFieldType.TEXT,
  })
  name: string;

  @formField({
    label: 'Domicilio',
    formFieldType: FormFieldType.TEXT,
  })
  address: string;

  @formField({
    label: 'Ocupación',
    formFieldType: FormFieldType.TEXT,
  })
  field1: string;

  @formField({
    label: 'Organización o Partido Politico',
    formFieldType: FormFieldType.TEXT,
  })
  field2: string;

  constructor(name: string, address: string, field1: string, field2: string) {
    this.name = name;
    this.address = address;
    this.field1 = field1;
    this.field2 = field2;
  }
}
