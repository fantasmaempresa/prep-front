import { Component, OnInit } from '@angular/core';
import { VIEW_CLAZZ } from 'o2c_core';
import { Promoter } from '../../../../data/models/Promoter.model';

@Component({
  selector: 'app-militant-list',
  templateUrl: './militant-list.component.html',
  styleUrls: ['./militant-list.component.scss'],
  providers: [{ provide: VIEW_CLAZZ, useValue: Promoter }],
})
export class MilitantListComponent {
  constructor() {}
}
