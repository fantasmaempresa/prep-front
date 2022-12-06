import { formField, FormFieldType, FormOption } from 'o2c_core';

export class Form5 {
  @formField({
    label: '¿Qué problemas y causas producen inestabilidad en el Municipio?',
    formFieldType: FormFieldType.TEXTAREA,
  })
  federal_deputy: string;

  @formField({
    label: 'Prospectiva del Municipio',
    formFieldType: FormFieldType.TEXTAREA,
  })
  political_parties_membership: string;

  constructor(federal_deputy: string, political_parties_membership: string) {
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
  }
}
