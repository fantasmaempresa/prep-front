import {
  AfterViewInit,
  Component,
  Injector,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FORM_CLAZZ,
  FormBuilder,
  FormBuilderComponent,
  FormFieldI,
  MessageHelper,
} from 'o2c_core';
import { Form2 } from '../../forms/form2';
import { Form1 } from '../../forms/form1';
import { combineLatest, debounceTime, Observable, startWith, tap } from 'rxjs';
import { Form3 } from '../../forms/form3';
import { Form4 } from '../../forms/form4';
import { Form6 } from '../../forms/form6';
import { Form5 } from '../../forms/form5';
import { Form7 } from '../../forms/form7';
import { HolidayTableForm } from '../../forms/holidays.form';
import { EjidalCouncilTableForm } from '../../forms/ejidal-council';
import { LeadersForm } from '../../forms/leader.form';
import {
  AuxiliaryAndMembersBoards,
  MunicipalitiesInspectors,
} from '../../forms/member.form';
import { MunicipalityAuthoritiesForm } from '../../forms/municipality-authority.form';
import { OrganizationsForms } from '../../forms/organization.form';
import { PowderTableForm } from '../../forms/powder.form';
import { PublicWorkTableForm } from '../../forms/public-work.form';
import { SchoolsForms } from '../../forms/school.form';
import { MatStep } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DraftStorage } from '../../../../core/draft-storage';
import { Form8 } from '../../forms/form8';
import { ChurchesForm } from '../../forms/church.form';

@Component({
  selector: 'app-politic-profile-form',
  templateUrl: './politic-profile-form.component.html',
  styleUrls: ['./politic-profile-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class PoliticProfileFormComponent implements AfterViewInit {
  @ViewChildren(FormBuilderComponent)
  listFormBuilder!: QueryList<FormBuilderComponent>;

  @ViewChildren(MatStep) listMatStep!: QueryList<MatStep>;

  draftStorage: DraftStorage = new DraftStorage('public-profile');

  views = [
    {
      title: 'Formulario 1',
      view: Form1,
    },
    {
      title: 'Formulario 2',
      view: Form2,
    },
    {
      title: 'Formulario 3',
      view: Form3,
    },
    {
      title: 'Autoridades Municipales',
      view: MunicipalityAuthoritiesForm,
    },
    {
      title: 'Formulario 4',
      view: Form4,
    },
    {
      title: 'Formulario 5',
      view: Form5,
    },
    {
      title: 'Formulario 6',
      view: Form6,
    },
    {
      title: 'Organización',
      view: OrganizationsForms,
    },
    {
      title: 'Escuelas',
      view: SchoolsForms,
    },
    {
      title: 'Formulario 7',
      view: Form7,
    },
    {
      title: 'Miembros de Juntas Auxiliares y Miembros de la Junta',
      view: AuxiliaryAndMembersBoards,
    },
    {
      title: 'Inspectores Municipales',
      view: MunicipalitiesInspectors,
    },
    {
      title: 'Formulario 8',
      view: Form8,
    },
    {
      title: 'Liderazgos en la Junta Auxiliar',
      view: LeadersForm,
    },
    {
      title: 'Organizaciones (Juntas Auxiliares)',
      view: OrganizationsForms,
    },
    {
      title: 'Aspirantes a presidentes Municipales',
      view: LeadersForm,
    },
    {
      title: 'Iglesias',
      view: ChurchesForm,
    },
    {
      title: 'Festividades',
      view: HolidayTableForm,
    },
    {
      title: 'Obra Publica Realizada',
      view: PublicWorkTableForm,
    },
    {
      title: 'Obra Publica Prioritaria',
      view: PublicWorkTableForm,
    },
    {
      title: 'Escuelas (Junta Auxiliar)',
      view: SchoolsForms,
    },
    {
      title: 'Consejo Ejidal',
      view: EjidalCouncilTableForm,
    },
    {
      title: 'Polvorines',
      view: PowderTableForm,
    },
  ];

  viewsFormFields: Observable<FormFieldI[]>[];

  constructor() {
    this.viewsFormFields = this.buildStepperForms();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setStepControlToStepper();
      this.askForDraft();
      combineLatest(
        this.listFormBuilder.map(({ form }) =>
          form.valueChanges.pipe(startWith(null))
        )
      )
        .pipe(
          tap((value) => {
            console.log(value);
          }),
          debounceTime(500),
          this.draftStorage.saveDraftOnValueChange()
        )
        .subscribe();
    }, 100);
  }

  private setStepControlToStepper() {
    this.listFormBuilder.forEach(({ form }, i) => {
      const stepper = this.listMatStep.get(i);
      if (stepper) {
        stepper.stepControl = form;
        form.reset();
      }
    });
  }

  private buildStepperForms() {
    return this.views.map(({ view }) => {
      const inj = Injector.create({
        providers: [{ provide: FORM_CLAZZ, useValue: view }],
      });
      const formBuilder = new FormBuilder(inj);
      return formBuilder.buildFormFields();
    });
  }

  private askForDraft() {
    const currentDraft: any[] | null = this.draftStorage.getDraft();
    if (currentDraft) {
      MessageHelper.decisionMessage(
        'Aviso de borrador',
        '¿Tienes un borrador guardado, quieres cargarlo?',
        () => {
          this.listFormBuilder.forEach(({ form }, index) => {
            console.log('cargando información');
            form.patchValue(currentDraft[index]);
          });
        }
      );
    }
  }
}
