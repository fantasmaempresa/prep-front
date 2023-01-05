import { EntityDto } from 'o2c_core';
import { SurveyDto } from './Survey.dto';
import { AnswerDto } from './Answer.dto';

export interface QuestionDto extends EntityDto {
  field: string;
  options: null;
  condition: null;
  type: number;
  survey_id: number;
  question_id: null;
  survey: SurveyDto;
  father_question: QuestionDto[];
  children_question: QuestionDto[];
  answers: AnswerDto[];
}
