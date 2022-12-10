import { formField, FormFieldType, FormOption } from 'o2c_core';

export class MembersForm {
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
    charge: string,
    name: string,
    address: string,
    phone: string,
    email: string
  ) {
    this.charge = charge;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}

const AUXILIARY_CHARGES = [
  { label: 'Presidente', value: 1 },
  { label: 'Secretario', value: 2 },
  {
    label: 'Tesorero',
    value: 3,
  },
  { label: 'Obras Públicas', value: 4 },
  { label: 'Comandante', value: 5 },
];
const AUXILIARY_CHARGES_OPTIONS = AUXILIARY_CHARGES.map(
  ({ label, value }) => new FormOption(label, value)
);

export class AuxiliaryBoardForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.DROPDOWN,
    options: AUXILIARY_CHARGES_OPTIONS,
  })
  override charge: string = '';
}

const BOARD_MEMBERS_CHARGES = [
  { label: '1.º Miembro Propietario', value: 1 },
  { label: '1.º Miembro Suplente', value: 2 },
  { label: '2.º Miembro Propietario', value: 3 },
  { label: '2.º Miembro Suplente', value: 4 },
  { label: '3.º. Miembro Propietario', value: 5 },
  { label: '3.º. Miembro Suplente', value: 6 },
  { label: '4.º. Miembro Propietario', value: 7 },
  { label: '4.º. Miembro Suplente', value: 8 },
];
const MEMBER_BOARD_CHARGES_OPTIONS = BOARD_MEMBERS_CHARGES.map(
  ({ label, value }) => new FormOption(label, value)
);

export class BoardMembersForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.DROPDOWN,
    options: MEMBER_BOARD_CHARGES_OPTIONS,
  })
  override charge: string = '';
}

export class JusticeOfPeaceMemberForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.TEXT,
  })
  override charge: string = '';
}

export class MunicipalityInspectorMemberForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.TEXT,
  })
  override charge: string = '';
}
