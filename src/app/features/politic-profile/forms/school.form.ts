import {
  formField,
  FormFieldType,
  FormOption,
  formTable,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { SchoolChargeForm } from './school-charge.form';

const SHIFT = [
  { label: 'Matutino', value: 1 },
  {
    label: 'Vespertino',
    value: 2,
  },
  { label: 'Nocturno', value: 3 },
];

const SHIFT_OPTIONS = SHIFT.map(
  ({ value, label }) => new FormOption(label, value)
);

export class SchoolForm {
  @formField({
    label: 'Nombre',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Nombre')
  politic_party: string;

  @formField({
    label: 'Clave Escolar',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Clave Escolar')
  key_school: string;

  @formField({
    label: 'Turno',
    formFieldType: FormFieldType.RADIO,
    options: SHIFT_OPTIONS,
  })
  @viewMapTo((v) => SHIFT.find(({ value }) => v === value)?.label)
  @viewLabel('Turno')
  name: string;

  @formField({
    label: 'Número de Alumnos',
    formFieldType: FormFieldType.NUMBER,
  })
  address: string;

  @formTable({
    tableProvider: SchoolChargeForm,
  })
  @formField({
    label: 'Cargo Escolar',
    formFieldType: FormFieldType.TABLE,
  })
  scholar_charge: string;

  constructor(
    politic_party: string,
    key_school: string,
    name: string,
    address: string,
    scholar_charge: string
  ) {
    this.politic_party = politic_party;
    this.key_school = key_school;
    this.name = name;
    this.address = address;
    this.scholar_charge = scholar_charge;
  }
}

export class SchoolsForms {
  @formTable({
    tableProvider: SchoolForm,
  })
  @formField({
    label: 'Escuelas',
    formFieldType: FormFieldType.TABLE,
  })
  table: string;

  constructor(table: string) {
    this.table = table;
  }
}
