import { formField, FormFieldType } from 'o2c_core';

export class ChurchForm {
  @formField({
    label: 'Iglesia',
    formFieldType: FormFieldType.TEXT,
  })
  association: string;

  @formField({
    label: 'Sacerdote, pastor u otro',
    formFieldType: FormFieldType.TEXT,
  })
  field1: string;

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
    label: 'Teléfono',
    formFieldType: FormFieldType.TEXT,
  })
  phone: string;

  @formField({
    label: 'No. aproximado de feligreses',
    formFieldType: FormFieldType.TEXT,
  })
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
