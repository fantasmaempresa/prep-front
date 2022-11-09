import { EntityDto } from 'o2c_core';
import { MunicipalityDto } from './Municipality.dto';

export interface FederalDistrictDto extends EntityDto {
  id: number;
  key: string;
  name: string;
  municipalities: MunicipalityDto[];
}
