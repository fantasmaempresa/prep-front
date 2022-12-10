import { formField, FormFieldType } from 'o2c_core';

export class PowderForm {
  @formField({
    label: 'Localidad',
    formFieldType: FormFieldType.TEXT,
  })
  district_federal: string;

  @formField({
    label: 'Domicilio',
    formFieldType: FormFieldType.TEXT,
  })
  municipality_header: string;

  @formField({
    label: 'Nombre del propietario',
    formFieldType: FormFieldType.TEXT,
  })
  federal_deputy: string;

  @formField({
    label: 'Cuenta con Licencia de SEDENA',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership: string;

  @formField({
    label: 'Regulado por Protección Civil',
    formFieldType: FormFieldType.TEXT,
  })
  former_district_federal: string;

  constructor(
    district_federal: string,
    municipality_header: string,
    federal_deputy: string,
    political_parties_membership: string,
    former_district_federal: string
  ) {
    this.district_federal = district_federal;
    this.municipality_header = municipality_header;
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
    this.former_district_federal = former_district_federal;
  }
}
