import { formField, FormFieldType, FormOption } from 'o2c_core';

export class Form4 {
  @formField({
    label: 'Hubo sustituciones de Presidente Municipal o Regidores',
    formFieldType: FormFieldType.RADIO,
    options: [new FormOption('Si', 1), new FormOption('No', 2)],
  })
  district_federal: string;

  @formField({
    label: '¿Por que motivo?',
    formFieldType: FormFieldType.TEXT,
  })
  federal_deputy: string;

  @formField({
    label:
      '¿En qué comunidades del Municipio se observan Conflictos y cuál es el motivo?',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership: string;

  @formField({
    label:
      '¿Cómo se vienen aplicando los diversos Programas Federales y Estatales?',
    formFieldType: FormFieldType.TEXT,
  })
  former_district_federal: string;

  @formField({
    label:
      'Relación existente con las Iglesias(Sacerdotes o Pastor u otro) y con Otros Grupos de Poder',
    formFieldType: FormFieldType.TEXT,
  })
  header_former: string;

  constructor(
    district_federal: string,
    federal_deputy: string,
    political_parties_membership: string,
    former_district_federal: string,
    header_former: string
  ) {
    this.district_federal = district_federal;
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
    this.former_district_federal = former_district_federal;
    this.header_former = header_former;
  }
}
