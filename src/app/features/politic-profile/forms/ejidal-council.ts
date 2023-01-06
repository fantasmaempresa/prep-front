import {
  formField,
  FormFieldType,
  FormOption,
  formTable,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { MembersForm } from './member.form';

const EJIDAL_CHARGE = [
  {
    label: 'Presidente',
    value: 1,
  },
  {
    label: 'Presidente Suplente',
    value: 2,
  },
  {
    label: 'Secretario',
    value: 3,
  },
  {
    label: 'Secretario Suplente',
    value: 4,
  },
  {
    label: 'Tesorero',
    value: 5,
  },
  {
    label: 'Tesorero Suplente',
    value: 6,
  },
];

const EJIDAL_CHARGE_OPTIONS = EJIDAL_CHARGE.map(
  ({ label, value }) => new FormOption(label, value)
);

export class EjidalCouncilMemberForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.DROPDOWN,
    options: EJIDAL_CHARGE_OPTIONS,
  })
  @viewMapTo(
    (v) => EJIDAL_CHARGE_OPTIONS.find(({ value }) => v === value)?.label
  )
  @viewLabel('Cargo')
  override charge: string = '';
}

const MONITORING_COMMITTEE = [
  {
    label: 'Presidente',
    value: 1,
  },
  {
    label: 'Presidente Suplente',
    value: 2,
  },
  {
    label: 'Primer Secretario',
    value: 3,
  },
  {
    label: 'Primer Secretario Suplente',
    value: 4,
  },
  {
    label: 'Segundo Secretario',
    value: 5,
  },
  {
    label: 'Segundo Secretario Suplente',
    value: 6,
  },
];
const MONITORING_COMMITTEE_OPTIONS = MONITORING_COMMITTEE.map(
  ({ label, value }) => new FormOption(label, value)
);

export class MonitoringCommitteeMemberForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.TEXT,
    options: MONITORING_COMMITTEE_OPTIONS,
  })
  @viewMapTo(
    (v) => MONITORING_COMMITTEE.find(({ value }) => v === value)?.label
  )
  override charge: string = '';
}

export class EjidalCouncilTableForm {
  @formTable({
    tableProvider: EjidalCouncilMemberForm,
  })
  @formField({
    label: 'Consejo Ejidal',
    formFieldType: FormFieldType.TABLE,
  })
  ejidal_table: string;

  @formTable({
    tableProvider: MonitoringCommitteeMemberForm,
  })
  @formField({
    label: 'Comité de Vigilancia',
    formFieldType: FormFieldType.TABLE,
  })
  monitoring_table: string;

  constructor(ejidal_table: string, monitoring_table: string) {
    this.ejidal_table = ejidal_table;
    this.monitoring_table = monitoring_table;
  }
}
