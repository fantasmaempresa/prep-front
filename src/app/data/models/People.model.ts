import { viewCrud } from 'o2c_core';
import { Promoter } from './Promoter.model';
import { PeopleService } from '../services/people.service';

@viewCrud({
  classProvider: PeopleService,
  route: {
    add: '../new',
    edit: '../',
  },
  registerName: 'Militante',
})
export class People extends Promoter {}
