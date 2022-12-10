import { formField, FormFieldType, FormOption } from 'o2c_core';

const MUNICIPALITY_CHARGE = [
  { label: 'Presidente Municipal', value: 1 },
  { label: 'Regidor de Gobierno', value: 2 },
  { label: 'Regidor de Hacienda', value: 3 },
  { label: 'Regidor de Obras Públicas', value: 4 },
  { label: 'Regidor de Salubridad', value: 5 },
  { label: 'Regidor de Educación', value: 6 },
  { label: 'Regidor de Industria y Comercio', value: 7 },
  { label: 'Sindico Municipal', value: 8 },
  { label: 'Secretario Particular del Presidente Municipal', value: 9 },
  { label: 'Secretario General del H. Ayuntamiento', value: 10 },
  { label: 'Secretario de Gobernación', value: 11 },
  { label: 'Secretario de Desarrollo Urbano y Ecología', value: 12 },
  { label: 'Consejero Jurídico', value: 13 },
  { label: 'Director Jurídico de la Sindicatura', value: 14 },
  { label: 'Presidenta del DIF Municipal', value: 15 },
  { label: 'Director DIF Municipal', value: 16 },
  { label: 'Coordinador de Desarrollo Comunitario DIF Municipal', value: 17 },
  { label: 'Coordinador de Comunicación', value: 18 },
  {
    label: 'Coordinador de Comunicación Social y Eventos del DIF Municipal',
    value: 19,
  },
  {
    label: 'Coordinador de Asistencia Alimentaria DIF Municipal',
    value: 20,
  },
  {
    label: 'Coordinador Orientación Jurídica del DIF Municipal',
    value: 21,
  },
  {
    label: 'Coordinador de Salud del DIF Municipal',
    value: 22,
  },
  {
    label: 'Coordinador de Desarrollo Familiar del DIF Municipal',
    value: 23,
  },
  {
    label: 'Juez Calificador',
    value: 24,
  },
  {
    label: 'Agente Subalterno del Ministerio Publico',
    value: 25,
  },
  {
    label: 'Tesorero Municipal',
    value: 26,
  },
  {
    label: 'Contralor Municipal',
    value: 27,
  },
  {
    label: 'Director de Comunicación Social e Imagen',
    value: 28,
  },
  {
    label: 'Director de Ingresos',
    value: 29,
  },
  {
    label: 'Director de Contabilidad',
    value: 30,
  },
  {
    label: 'Director de Egresos',
    value: 31,
  },
  {
    label: 'Director de Turismo y Fomento Económico',
    value: 32,
  },
  {
    label: 'Director de Agricultura y Ganadería',
    value: 33,
  },
  {
    label: 'Director de la Casa de Cultura',
    value: 34,
  },
  {
    label: 'Director de Antirrábico',
    value: 35,
  },
  {
    label: 'Director de Educación',
    value: 36,
  },
  {
    label: 'Director de Participación Ciudadana',
    value: 37,
  },
  {
    label: 'Director de Servicios Generales',
    value: 38,
  },
  {
    label: 'Director de Servicios Municipales',
    value: 39,
  },
  {
    label: 'Director de Proyectos',
    value: 40,
  },
  {
    label: 'Director de Ejecución y Control de Obras',
    value: 41,
  },
  {
    label: 'Director de Planeación Urbana Sustentable',
    value: 42,
  },
  {
    label: 'Director Comercial y de Administración',
    value: 43,
  },
  {
    label: 'Director de Seguridad Pública Municipal',
    value: 44,
  },
  {
    label: 'Director de Giros Comerciales',
    value: 45,
  },
  {
    label: 'Director de Operación, Mantenimiento y Calidad del Agua',
    value: 46,
  },
  {
    label: 'Administrador del Organismo Operador del Agua Potable',
    value: 47,
  },
  {
    label: 'Comisario Ejidal Residente',
    value: 48,
  },
  {
    label: 'Secretario',
    value: 48,
  },
  {
    label: 'Tesorero',
    value: 49,
  },
  {
    label: 'Consejo de Vigilancia',
    value: 50,
  },
  {
    label: 'Secretario',
    value: 51,
  },
];

const OPTIONS_MUNICIPALITY_FORM_OPTIONS = MUNICIPALITY_CHARGE.map(
  ({ label, value }) => new FormOption(label, value)
);

export class MunicipalityAuthorityForm {
  @formField({
    label: 'Cargo',
    formFieldType: FormFieldType.DROPDOWN,
    options: OPTIONS_MUNICIPALITY_FORM_OPTIONS,
  })
  charge: string;

  @formField({
    label: 'Nombre',
    formFieldType: FormFieldType.TEXT,
  })
  name: string;

  @formField({
    label: 'Edad',
    formFieldType: FormFieldType.TEXT,
  })
  age: string;

  @formField({
    label: 'Partido Politico',
    formFieldType: FormFieldType.TEXT,
  })
  political_party: string;

  @formField({
    label: 'Observaciones',
    formFieldType: FormFieldType.TEXTAREA,
  })
  observations: string;

  constructor(
    charge: string,
    name: string,
    age: string,
    political_party: string,
    observations: string
  ) {
    this.charge = charge;
    this.name = name;
    this.age = age;
    this.political_party = political_party;
    this.observations = observations;
  }
}
