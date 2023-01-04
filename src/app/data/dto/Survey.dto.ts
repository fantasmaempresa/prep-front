import { EntityDto } from "o2c_core";
import { UserDto } from "./User.dto";

export interface SurveyDto extends EntityDto {
  name:       string;
  visible:    number;
  user_id:    number;
  user:       UserDto;
  questions:  Question[];
}

export interface Question extends EntityDto {
  field:       string;
  options:     Option[] | null;
  condition:   null;
  type:        number;
  survey_id:   number;
  question_id: null;
}

export interface Option {
  option: string;
}


