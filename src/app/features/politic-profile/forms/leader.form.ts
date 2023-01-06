import { formField, FormFieldType, formTable, viewLabel } from 'o2c_core';

export class LeaderForm {
  @formField({
    label: 'Asociación o partido político u otro',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Asociación o partido político u otro')
  association: string;

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
    label: 'Teléfono',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Teléfono')
  phone: string;

  @formField({
    label: 'E-mail',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('E-mail')
  email: string;

  constructor(
    charge: string,
    name: string,
    address: string,
    phone: string,
    email: string
  ) {
    this.association = charge;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}

export class LeadersForm {
  @formTable({
    tableProvider: LeaderForm,
  })
  @formField({
    label: 'Liderazgos en la Junta Auxiliar',
    formFieldType: FormFieldType.TABLE,
  })
  leadership_table: string;

  constructor(leadership_table: string) {
    this.leadership_table = leadership_table;
  }
}
