import { formField, FormFieldType } from 'o2c_core';

export class Form6 {
  @formField({
    label: '¿Cómo evalúa el estado el problema?',
    formFieldType: FormFieldType.TEXTAREA,
  })
  federal_deputy: string;

  @formField({
    label: 'Dependencias que intervienen',
    formFieldType: FormFieldType.TEXTAREA,
  })
  political_parties_membership: string;

  @formField({
    label: 'Propuestas Socio - Políticas para solucionar el problema',
    formFieldType: FormFieldType.TEXTAREA,
  })
  field1: string;

  constructor(
    federal_deputy: string,
    political_parties_membership: string,
    field1: string
  ) {
    this.federal_deputy = federal_deputy;
    this.political_parties_membership = political_parties_membership;
    this.field1 = field1;
  }
}
