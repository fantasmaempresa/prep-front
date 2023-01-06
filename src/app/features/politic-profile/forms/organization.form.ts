import { formField, FormFieldType, formTable, viewLabel } from 'o2c_core';

export class OrganizationForm {
  @formField({
    label: 'Denominación',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Denominación')
  district_federal: string;

  @formField({
    label: 'Nombre del Líder',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Nombre del Líder')
  federal_deputy: string;

  @formField({
    label: 'Domicilio',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Domicilio')
  political_parties_membership: string;

  @formField({
    label: 'Teléfono',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Teléfono')
  former_district_federal: string;

  @formField({
    label: 'E-mail',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('E-mail')
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

export class OrganizationsForms {
  @formTable({
    tableProvider: OrganizationForm,
  })
  @formField({
    label: 'Organizaciones',
    formFieldType: FormFieldType.TABLE,
  })
  table: string;

  constructor(table: string) {
    this.table = table;
  }
}
