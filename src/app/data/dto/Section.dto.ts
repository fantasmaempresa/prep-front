import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface SectionDto extends EntityDto {
  id: number;
  section: string;
  type: string;
  municipality_id: number;
}
