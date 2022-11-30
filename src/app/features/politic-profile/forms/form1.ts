import { formField, FormFieldType } from 'o2c_core';

export class Form1 {
  @formField({
    label: 'Distrito federal',
    formFieldType: FormFieldType.TEXT,
  })
  district_federal: string;

  @formField({
    label: 'Cabecera',
    formFieldType: FormFieldType.TEXT,
  })
  municipality_header: string;

  @formField({
    label: 'Diputado federal',
    formFieldType: FormFieldType.TEXT,
  })
  federal_deputy: string;

  @formField({
    label: 'Partidos(s) a los que pertenece:',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership: string;

  @formField({
    label: 'Distrito local anterior',
    formFieldType: FormFieldType.TEXT,
  })
  former_district_federal: string;

  @formField({
    label: 'Cabecera',
    formFieldType: FormFieldType.TEXT,
  })
  header_former: string;

  @formField({
    label: 'Partido(s) a los que pertenece',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership_former: string;

  @formField({
    label: 'Distrito Local Actual',
    formFieldType: FormFieldType.TEXT,
  })
  local_district_current: string;

  @formField({
    label: 'Presidente Municipal en funciones',
    formFieldType: FormFieldType.TEXT,
  })
  municipality_president_in_functions: string;

  @formField({
    label: 'Partido a los que pertenece',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership_president_in_functions: string;

  @formField({
    label: 'Presidente municipal electo',
    formFieldType: FormFieldType.TEXT,
  })
  municipality_president_elected: string;
  @formField({
    label: 'Partidos a los que pertenece',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership_municipality_president_elected: string;

  constructor(
    district_federal: string,
    municipality_header: string,
    federal_deputy: string,
    political_parties_membership: string,
    former_district_federal: string,
    header_former: string,
    political_parties_membership_former: string,
    local_district_current: string,
    municipality_president_in_functions: string,
    political_parties_membership_president_in_functions: string,
    municipality_president_elected: string,
    political_parties_membership_municipality_president_elected: string
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
    this.municipality_president_in_functions =
      municipality_president_in_functions;
    this.political_parties_membership_president_in_functions =
      political_parties_membership_president_in_functions;
    this.municipality_president_elected = municipality_president_elected;
    this.political_parties_membership_municipality_president_elected =
      political_parties_membership_municipality_president_elected;
  }
}
