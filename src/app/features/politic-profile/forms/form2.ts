import { formField, FormFieldType, FormOption } from 'o2c_core';

export const RELATION_OPTIONS = [
  new FormOption('Buena', 1),
  new FormOption('Regular', 2),
  new FormOption('Mala', 3),
];

export class Form2 {
  @formField({
    label: 'Relación entre el Diputado Federal y el Diputado Local',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  district_federal: string;

  @formField({
    label:
      'Relación entre el Diputado Federal y el Diputado Local en Funciones',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  municipality_header: string;

  @formField({
    label: 'Relación entre el Diputado Federal y el Diputado Local Electo',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  federal_deputy: string;

  @formField({
    label:
      'Relación entre el Diputado Federal y el Presidente Municipal Electo',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  political_parties_membership: string;

  @formField({
    label: 'Relación entre el Diputado Local y el Diputado Local Electo',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  former_district_federal: string;

  @formField({
    label:
      'Relación entre el Diputado Local y el Presidente Municipal en funciones',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  header_former: string;

  @formField({
    label: 'Relación entre el diputado Local y el Presidente Municipal Electo',
    formFieldType: FormFieldType.RADIO,
    options: RELATION_OPTIONS,
  })
  political_parties_membership_former: string;

  @formField({
    label: 'Observaciones',
    formFieldType: FormFieldType.TEXTAREA,
  })
  local_district_current: string;

  constructor(
    district_federal: string,
    municipality_header: string,
    federal_deputy: string,
    political_parties_membership: string,
    former_district_federal: string,
    header_former: string,
    political_parties_membership_former: string,
    local_district_current: string
  ) {
    this.district_federal = district_federal;
    this.municipality_header = municipality_header;
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
    this.former_district_federal = former_district_federal;
    this.header_former = header_former;
    this.political_parties_membership_former =
      political_parties_membership_former;
    this.local_district_current = local_district_current;
  }
}
