import { formField, FormFieldType, FormOption } from 'o2c_core';

export class OrganizationForm {
  @formField({
    label: 'Denominación',
    formFieldType: FormFieldType.TEXT,
  })
  district_federal: string;

  @formField({
    label: 'Nombre del Líder',
    formFieldType: FormFieldType.TEXT,
  })
  federal_deputy: string;

  @formField({
    label: 'Domicilio',
    formFieldType: FormFieldType.TEXT,
  })
  political_parties_membership: string;

  @formField({
    label: 'Teléfono',
    formFieldType: FormFieldType.TEXT,
  })
  former_district_federal: string;

  @formField({
    label: 'E-mail',
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
