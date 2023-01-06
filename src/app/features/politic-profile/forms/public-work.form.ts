import { formField, FormFieldType, formTable, viewLabel } from 'o2c_core';

export class PublicWorkForm {
  @formField({
    label: 'Tipo',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Tipo')
  association: string;

  @formField({
    label: 'Ubicación',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Ubicación')
  field1: string;

  @formField({
    label: 'Inversión',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Inversión')
  name: string;

  @formField({
    label: 'Realizada o porcentaje de avance',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Realizada o porcentaje de avance')
  address: string;

  @formField({
    label: 'Año',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Año')
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

export class PublicWorkTableForm {
  @formTable({
    tableProvider: PublicWorkForm,
  })
  @formField({
    label: 'Obra Publica Realizada',
    formFieldType: FormFieldType.TABLE,
  })
  table: string;

  constructor(table: string) {
    this.table = table;
  }
}
