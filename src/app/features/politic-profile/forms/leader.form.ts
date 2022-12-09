import { formField, FormFieldType } from 'o2c_core';

export class LeaderForm {
  @formField({
    label: 'Asociación o partido político u otro',
    formFieldType: FormFieldType.TEXT,
  })
  association: string;

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
    charge: string,
    name: string,
    address: string,
    phone: string,
    email: string
  ) {
    this.association = charge;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}
