import { EntityDto } from '../../core/interfaces/Entity.dto';
import { SectionDto } from './Section.dto';

export interface MunicipalityDto extends EntityDto {
  id: number;
  key: string;
  name: string;
  sections: SectionDto[];
}
