import { Component, OnInit } from '@angular/core';
import { VIEW_CLAZZ } from 'o2c_core';
import { Zone } from '../../../../data/models/Zone.model';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss'],
  providers: [{ provide: VIEW_CLAZZ, useValue: Zone }],
})
export class ZonesListComponent {
  constructor() { }
}
