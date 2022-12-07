import { Component, Injector, QueryList, ViewChildren } from '@angular/core';
import {
  FORM_CLAZZ,
  FormBuilder,
  FormBuilderComponent,
  FormField,
} from 'o2c_core';
import { Form2 } from '../../forms/form2';
import { Form1 } from '../../forms/form1';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-politic-profile-form',
  templateUrl: './politic-profile-form.component.html',
  styleUrls: ['./politic-profile-form.component.scss'],
})
export class PoliticProfileFormComponent {
  @ViewChildren(FormBuilderComponent)
  listFormBuilder!: QueryList<FormBuilderComponent>;

  views = [
    {
      title: 'Formulario 1',
      view: Form1,
    },
    {
      title: 'Formulario 2',
      view: Form2,
    },
  ];

  viewsFormFields: Observable<FormField[]>[];

  constructor() {
    this.viewsFormFields = this.buildStepperForms();
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
}
