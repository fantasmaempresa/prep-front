import { EntityDto } from 'o2c_core';
import { SectionDto } from './Section.dto';

export interface ZoneDto extends EntityDto {
  name: string;
  description: string;
  sections: SectionDto[];
  political_profile: any;
  locked: ZoneStatus;
}

export enum ZoneStatus {
  UNLOCKED = 1,
  LOCKED = 2,
}
