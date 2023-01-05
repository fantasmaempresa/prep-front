import { EntityDto } from 'o2c_core';

export interface AnswerDto extends EntityDto {
  answer: string;
  user_id: number;
  person_id: number;
  question_id: number;
}
