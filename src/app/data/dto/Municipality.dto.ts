import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface MunicipalityDto extends EntityDto {
  id: number;
  key: string;
  name: string;
}
