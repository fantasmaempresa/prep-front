import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { SurveyDto } from '../dto/Survey.dto';

@Injectable({
  providedIn: 'root',
})
export class SurveyService extends CrudService<
  SurveyDto,
  Pagination<SurveyDto>
> {
  constructor() {
    super('surveys');
  }
}
