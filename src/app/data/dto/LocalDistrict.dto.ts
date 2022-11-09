import { EntityDto } from 'o2c_core';

export interface LocalDistrictDto extends EntityDto {
  id: number;
  key: string;
  name: string;
}
