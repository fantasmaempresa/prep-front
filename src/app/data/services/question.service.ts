import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { QuestionDto } from '../dto/Question.dto';

@Injectable({
  providedIn: 'root',
})
export class QuestionService extends CrudService<
  QuestionDto,
  Pagination<QuestionDto>
> {
  constructor() {
    super('questions');
  }
}
