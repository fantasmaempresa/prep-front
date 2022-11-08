import { EntityDto } from '../../core/interfaces/Entity.dto';
import { MunicipalityDto } from './Municipality.dto';

export interface FederalDistrictDto extends EntityDto {
  id: number;
  key: string;
  name: string;
  municipalities: MunicipalityDto[];
}
