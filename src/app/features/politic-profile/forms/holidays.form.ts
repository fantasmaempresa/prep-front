import { formField, FormFieldType, formTable, viewLabel } from 'o2c_core';

export class HolidaysForm {
  @formField({
    label: 'Fecha',
    formFieldType: FormFieldType.DATE,
  })
  @viewLabel('Fecha')
  association: string;

  @formField({
    label: 'Conmemoración',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Conmemoración')
  field1: string;

  @formField({
    label: 'Responsable(s)',
    formFieldType: FormFieldType.TEXTAREA,
  })
  @viewLabel('Responsable(s)')
  name: string;

  @formField({
    label: 'Lugar(Localidad, Inspectoría, Ranchería, Etc.)',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Lugar(Localidad, Inspectoría, Ranchería, Etc.)')
  address: string;

  @formField({
    label: 'Teléfonos',
    formFieldType: FormFieldType.TEXTAREA,
  })
  @viewLabel('Teléfonos')
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

export class HolidayTableForm {
  @formTable({
    tableProvider: HolidaysForm,
  })
  @formField({
    label: 'Festividades',
    formFieldType: FormFieldType.TABLE,
  })
  holiday_table: string;

  constructor(holiday_table: string) {
    this.holiday_table = holiday_table;
  }
}
