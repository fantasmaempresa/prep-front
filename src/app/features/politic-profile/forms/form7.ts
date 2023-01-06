import { formField, FormFieldType } from 'o2c_core';
import { RELATION_OPTIONS } from './form2';

export class Form7 {
  @formField({
    label:
      'Relación entre el Diputado Federal y el Presidente Auxiliar en Funciones',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  district_federal: string;

  @formField({
    label:
      'Relación entre el Diputado Local y el Presidente Auxiliar en Funciones',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  municipality_header: string;

  @formField({
    label: 'Relación entre el Diputado Local Electo y el presidente Auxiliar',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  federal_deputy: string;

  @formField({
    label: 'Relación entre el Presidente Municipal y el Presidente Auxiliar',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  political_parties_membership: string;

  @formField({
    label:
      'Relación entre el presidente Municipal Electo y el Presidente Auxiliar',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  former_district_federal: string;

  @formField({
    label: 'Partido al que pertenece el presidente Auxiliar',
    formFieldType: FormFieldType.TEXT,
  })
  header_former: string;

  @formField({
    label: 'Observaciones',
    formFieldType: FormFieldType.TEXTAREA,
  })
  political_parties_membership_former: string;

  constructor(
    district_federal: string,
    municipality_header: string,
    federal_deputy: string,
    political_parties_membership: string,
    former_district_federal: string,
    header_former: string,
    political_parties_membership_former: string
  ) {
    this.district_federal = district_federal;
    this.municipality_header = municipality_header;
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
    this.former_district_federal = former_district_federal;
    this.header_former = header_former;
    this.political_parties_membership_former =
      political_parties_membership_former;
  }
}
