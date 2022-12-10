import { formField, FormFieldType } from 'o2c_core';

export class PoliticalPartyRepresentativeForm {
  @formField({
    label: 'Partido Politico',
    formFieldType: FormFieldType.TEXT,
  })
  politic_party: string;

  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.TEXT,
  })
  charge: string;

  @formField({
    label: 'Nombre',
    formFieldType: FormFieldType.TEXT,
  })
  name: string;

  @formField({
    label: 'Domicilio',
    formFieldType: FormFieldType.TEXT,
  })
  address: string;

  @formField({
    label: 'Teléfono',
    formFieldType: FormFieldType.TEXT,
  })
  phone: string;

  @formField({
    label: 'E-mail',
    formFieldType: FormFieldType.TEXT,
  })
  email: string;

  constructor(
    politic_party: string,
    municipality_header: string,
    charge: string,
    name: string,
    address: string,
    phone: string,
    email: string
  ) {
    this.politic_party = politic_party;
    this.charge = charge;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}
