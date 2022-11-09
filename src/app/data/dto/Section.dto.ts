import { EntityDto } from 'o2c_core';

export interface SectionDto extends EntityDto {
  id: number;
  section: string;
  type: string;
  municipality_id: number;
}
