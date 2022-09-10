import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface FederalDistrictDto extends EntityDto {
  id: number;
  key: string;
  name: string;
}
