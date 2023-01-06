import { formField, FormFieldType, formTable } from 'o2c_core';
import { ActorsOfProblemForm } from './actors-of-problem.form';

export class Form6 {
  @formField({
    label: '¿Cómo evalúa el estado el problema?',
    formFieldType: FormFieldType.TEXTAREA,
  })
  federal_deputy: string;

  @formTable({
    tableProvider: ActorsOfProblemForm,
  })
  @formField({
    label: 'Actores de Problema',
    formFieldType: FormFieldType.TABLE,
  })
  tableActors: string;

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
    tableActors: string,
    political_parties_membership: string,
    field1: string
  ) {
    this.federal_deputy = federal_deputy;
    this.tableActors = tableActors;
    this.political_parties_membership = political_parties_membership;
    this.field1 = field1;
  }
}
