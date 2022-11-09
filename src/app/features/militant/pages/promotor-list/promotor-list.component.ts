import { Component } from '@angular/core';
import { VIEW_CLAZZ } from 'o2c_core';
import { Promoter } from '../../../../data/models/Promoter.model';

@Component({
  selector: 'app-promotor-list',
  templateUrl: './promotor-list.component.html',
  styleUrls: ['./promotor-list.component.scss'],
  providers: [{ provide: VIEW_CLAZZ, useValue: Promoter }],
})
export class PromotorListComponent {
  constructor() {}
}
