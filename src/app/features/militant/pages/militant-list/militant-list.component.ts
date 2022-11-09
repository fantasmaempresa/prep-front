import { Component } from '@angular/core';
import { VIEW_CLAZZ } from 'o2c_core';
import { People } from '../../../../data/models/People.model';

@Component({
  selector: 'app-militant-list',
  templateUrl: './militant-list.component.html',
  styleUrls: ['./militant-list.component.scss'],
  providers: [{ provide: VIEW_CLAZZ, useValue: People }],
})
export class MilitantListComponent {
  constructor() {}
}
