import { formField, FormFieldType } from 'o2c_core';

export class Form3 {
  @formField({
    label: 'Distrito Judicial',
    formFieldType: FormFieldType.TEXT,
  })
  district_federal: string;

  municipality_header: string;

  @formField({
    label: 'Grado de Marginación',
    formFieldType: FormFieldType.TEXT,
  })
  federal_deputy: string;

  @formField({
    label: 'Grado de Rezago Social',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership: string;

  @formField({
    label: 'Población',
    formFieldType: FormFieldType.TEXT,
  })
  former_district_federal: string;

  @formField({
    label: 'Nivel de Escolaridad en el Municipio',
    formFieldType: FormFieldType.TEXT,
  })
  header_former: string;

  @formField({
    label: 'Lista Nominal',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership_former: string;

  @formField({
    label: 'No. de Juntas Auxiliares',
    formFieldType: FormFieldType.TEXT,
  })
  field1: string;
  @formField({
    label: 'No. de Comunidades o Localidades',
    formFieldType: FormFieldType.TEXT,
  })
  field2: string;
  @formField({
    label: 'Nombre del sacerdote',
    formFieldType: FormFieldType.TEXT,
  })
  field3: string;

  constructor(
    district_federal: string,
    municipality_header: string,
    federal_deputy: string,
    political_parties_membership: string,
    former_district_federal: string,
    header_former: string,
    political_parties_membership_former: string,
    field1: string,
    field2: string,
    field3: string
  ) {
    this.district_federal = district_federal;
    this.municipality_header = municipality_header;
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
    this.former_district_federal = former_district_federal;
    this.header_former = header_former;
    this.political_parties_membership_former =
      political_parties_membership_former;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
  }
}
