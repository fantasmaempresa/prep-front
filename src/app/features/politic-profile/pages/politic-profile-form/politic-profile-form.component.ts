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
import { combineLatest, debounceTime, Observable, startWith } from 'rxjs';
import { Form3 } from '../../forms/form3';
import { Form4 } from '../../forms/form4';
import { Form6 } from '../../forms/form6';
import { Form5 } from '../../forms/form5';
import { Form7 } from '../../forms/form7';
import { Form8 } from '../../forms/form8';
import { HolidaysForm } from '../../forms/holidays.form';
import { ActorsOfProblemForm } from '../../forms/actors-of-problem.form';
import {
  EjidalCouncilMemberForm,
  MonitoringCommitteeMemberForm,
} from '../../forms/ejidal-council';
import { LeaderForm } from '../../forms/leader.form';
import {
  AuxiliaryBoardForm,
  BoardMembersForm,
  JusticeOfPeaceMemberForm,
  MunicipalityInspectorMemberForm,
} from '../../forms/member.form';
import { MunicipalityAuthorityForm } from '../../forms/municipality-authority.form';
import { OrganizationForm } from '../../forms/organization.form';
import { PoliticalPartyRepresentativeForm } from '../../forms/political-party-representative.form';
import { PowderForm } from '../../forms/powder.form';
import { PublicWorkForm } from '../../forms/public-work.form';
import { SchoolForm } from '../../forms/school.form';
import { SchoolChargeForm } from '../../forms/school-charge.form';
import { MatStep } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DraftStorage } from '../../../../core/draft-storage';

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
      title: 'Formulario 7',
      view: Form7,
    },
    {
      title: 'Formulario 8',
      view: Form8,
    },
    {
      title: 'Festividades',
      view: HolidaysForm,
    },
    {
      title: 'Cargo 1',
      view: ActorsOfProblemForm,
    },
    {
      title: 'Consejo Ejidal',
      view: EjidalCouncilMemberForm,
    },
    {
      title: 'Líder',
      view: LeaderForm,
    },
    {
      title: 'Miembro de mesa',
      view: BoardMembersForm,
    },
    {
      title: 'Miembro de Paz',
      view: JusticeOfPeaceMemberForm,
    },
    {
      title: 'Inspector Municipal',
      view: MunicipalityInspectorMemberForm,
    },
    {
      title: 'Autoridad de Municipio',
      view: MunicipalityAuthorityForm,
    },
    {
      title: 'Organización',
      view: OrganizationForm,
    },
    {
      title: 'Representante de partido Politico',
      view: PoliticalPartyRepresentativeForm,
    },
    {
      title: 'Polvorines',
      view: PowderForm,
    },
    {
      title: 'Obra Publica',
      view: PublicWorkForm,
    },
    {
      title: 'Escuela',
      view: SchoolForm,
    },
    {
      title: 'Cargo de Escuela',
      view: SchoolChargeForm,
    },
    {
      title: 'Representante de partido Politico',
      view: PoliticalPartyRepresentativeForm,
    },
    {
      title: 'Miembro de Comité',
      view: MonitoringCommitteeMemberForm,
    },
    {
      title: 'Miembro Auxiliar de Mesa',
      view: AuxiliaryBoardForm,
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
        .pipe(debounceTime(500), this.draftStorage.saveDraftOnValueChange())
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
