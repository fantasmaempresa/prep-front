import { EntityDto } from 'o2c_core';
import { UserDto } from './User.dto';
import { QuestionDto } from './Question.dto';

export interface SurveyDto extends EntityDto {
  name: string;
  visible: number;
  user_id: number;
  user: UserDto;
  questions: QuestionDto[];
}

export interface Option {
  option: string;
}

