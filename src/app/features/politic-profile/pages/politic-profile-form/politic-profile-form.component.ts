import { Component } from '@angular/core';

@Component({
  selector: 'app-politic-profile-form',
  templateUrl: './politic-profile-form.component.html',
  styleUrls: ['./politic-profile-form.component.scss'],
})
export class PoliticProfileFormComponent {
  // views: {
  //   title: string;
  //   view: any;
  //   control: Observable<FormField[]>[];
  //   formGroup: any;
  // }[] = [
  //   {
  //     title: 'De Prueba',
  //     view: Form1,
  //     formGroup: null,
  //   },
  //   {
  //     title: 'De Prueba 2',
  //     view: Form2,
  //     formGroup: null,
  //   },
  // ];

  constructor() {
    // this.views.map(({ view, title }) => {
    //   const inj = Injector.create({
    //     providers: [{ provide: VIEW_CLAZZ, useValue: view }],
    //   });
    //   const controls$ = new FormBuilder(inj).buildFormFields();
    //   return { view, title, control: controls$ };
    // });
  }
}
