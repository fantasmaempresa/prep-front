import { formField, FormFieldType, FormOption, formTable } from 'o2c_core';
import { AuxiliaryBoardForm } from './member.form';

export class Form8 {
  @formField({
    label: 'Forma en que se conformó a los integrantes del H. Cabildo Auxiliar',
    formFieldType: FormFieldType.TEXTAREA,
  })
  district_federal: string;

  @formField({
    label:
      'Existió Sustituciones de Presidente Auxiliar o de algún(os) Regidor(es)',
    formFieldType: FormFieldType.RADIO,
    options: [new FormOption('Si', 1), new FormOption('Si', 2)],
  })
  municipality_header: string;

  @formField({
    label: '¿Cuál fue el motivo?',
    formFieldType: FormFieldType.TEXTAREA,
  })
  federal_deputy: string;

  @formField({
    label: 'Relación entre la Administración Auxiliar y el H. Ayuntamiento',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership: string;

  @formField({
    label: 'La Administración Auxiliar recibe sus participaciones',
    formFieldType: FormFieldType.TEXTAREA,
  })
  former_district_federal: string;

  @formField({
    label: 'Partido al que pertenece el presidente Auxiliar',
    formFieldType: FormFieldType.TEXT,
  })
  header_former: string;

  @formTable({
    tableProvider: AuxiliaryBoardForm,
  })
  @formField({
    label:
      'Personas Destacadas que se consideren Factores de Poder dentro de la Junta',
    formFieldType: FormFieldType.TABLE,
  })
  people_table: string;

  constructor(
    district_federal: string,
    municipality_header: string,
    federal_deputy: string,
    political_parties_membership: string,
    former_district_federal: string,
    header_former: string,
    people_table: string
  ) {
    this.district_federal = district_federal;
    this.municipality_header = municipality_header;
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
    this.former_district_federal = former_district_federal;
    this.header_former = header_former;
    this.people_table = people_table;
  }
}
