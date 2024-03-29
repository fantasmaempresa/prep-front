import {
  formField,
  FormFieldType,
  FormOption,
  viewLabel,
  viewMapTo,
} from 'o2c_core';

const SCHOOL_CHARGE = [
  { label: 'Director', value: 1 },
  { label: 'Subdirector', value: 2 },
  { label: 'Presidente del Comité de padres de familia', value: 3 },
  { label: 'Secretario', value: 4 },
  { label: 'Tesorero', value: 5 },
];

const SCHOOL_CHARGE_FORM_OPTIONS = SCHOOL_CHARGE.map(
  ({ label, value }) => new FormOption(label, value)
);

export class SchoolChargeForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.DROPDOWN,
    options: SCHOOL_CHARGE_FORM_OPTIONS,
  })
  @viewMapTo((v) => SCHOOL_CHARGE.find(({ value }) => v === value)?.label)
  @viewLabel('Cargo')
  charge: string;

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
  age: string;

  @formField({
    label: 'Teléfono',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Teléfono')
  political_party: string;

  @formField({
    label: 'E-mail',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('E-mail')
  observations: string;

  constructor(
    charge: string,
    name: string,
    age: string,
    political_party: string,
    observations: string
  ) {
    this.charge = charge;
    this.name = name;
    this.age = age;
    this.political_party = political_party;
    this.observations = observations;
  }
}
