import { SectionDto } from './Section.dto';
import { EntityDto } from 'o2c_core';

export interface MunicipalityDto extends EntityDto {
  id: number;
  key: string;
  name: string;
  sections: SectionDto[];
}
