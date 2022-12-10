import { formField, FormFieldType } from 'o2c_core';

export class HolidaysForm {
  @formField({
    label: 'Fecha',
    formFieldType: FormFieldType.DATE,
  })
  association: string;

  @formField({
    label: 'Conmemoración',
    formFieldType: FormFieldType.TEXT,
  })
  field1: string;

  @formField({
    label: 'Responsable(s)',
    formFieldType: FormFieldType.TEXTAREA,
  })
  name: string;

  @formField({
    label: 'Lugar(Localidad, Inspectoría, Ranchería, Etc.)',
    formFieldType: FormFieldType.TEXT,
  })
  address: string;

  @formField({
    label: 'Teléfonos',
    formFieldType: FormFieldType.TEXTAREA,
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
