import { formField, FormFieldType } from 'o2c_core';

export class PublicWorkForm {
  @formField({
    label: 'Tipo',
    formFieldType: FormFieldType.TEXT,
  })
  association: string;

  @formField({
    label: 'Ubicación',
    formFieldType: FormFieldType.TEXT,
  })
  field1: string;

  @formField({
    label: 'Inversión',
    formFieldType: FormFieldType.NUMBER,
  })
  name: string;

  @formField({
    label: 'Realizada o porcentaje de avance',
    formFieldType: FormFieldType.NUMBER,
  })
  address: string;

  @formField({
    label: 'Año',
    formFieldType: FormFieldType.TEXT,
  })
  phone: string;

  constructor(
    association: string,
    field1: string,
    name: string,
    address: string,
    phone: string
  ) {
    this.association = association;
    this.field1 = field1;
    this.name = name;
    this.address = address;
    this.phone = phone;
  }
}
