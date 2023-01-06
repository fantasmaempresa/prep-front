import { formField, FormFieldType, formTable, viewLabel } from 'o2c_core';
import { LeaderForm } from './leader.form';

export class ChurchForm {
  @formField({
    label: 'Iglesia',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Iglesia')
  association: string;

  @formField({
    label: 'Sacerdote, pastor u otro',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Sacerdote, pastor u otro')
  field1: string;

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
    label: 'No. aproximado de feligreses',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('No. aproximado de feligreses')
  email: string;

  constructor(
    association: string,
    field1: string,
    name: string,
    address: string,
    phone: string,
    email: string
  ) {
    this.association = association;
    this.field1 = field1;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}

export class ChurchesForm {
  @formTable({
    tableProvider: ChurchForm,
  })
  @formField({
    label: 'Iglesias',
    formFieldType: FormFieldType.TABLE,
  })
  church_table: string;

  constructor(church_table: string) {
    this.church_table = church_table;
  }
}
