import { formField, FormFieldType, FormOption } from 'o2c_core';
import { MembersForm } from './member.form';

const EJIDAL_CHARGE_OPTIONS = [
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
].map(({ label, value }) => new FormOption(label, value));

export class EjidalCouncilMemberForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.TEXT,
    options: EJIDAL_CHARGE_OPTIONS,
  })
  override charge: string = '';
}

const MONITORING_COMMITTEE_OPTIONS = [
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
].map(({ label, value }) => new FormOption(label, value));

export class MonitoringCommitteeMemberForm extends MembersForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.TEXT,
    options: MONITORING_COMMITTEE_OPTIONS,
  })
  override charge: string = '';
}
