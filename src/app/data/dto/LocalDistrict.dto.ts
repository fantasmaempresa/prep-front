import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface LocalDistrictDto extends EntityDto {
  id: number;
  key: string;
  name: string;
}
