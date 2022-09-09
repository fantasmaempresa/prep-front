import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface UserAuthDto extends EntityDto {
  name: string;
  email: string;
  email_verified_at: Date;
  config: object;
  role_id: number;
}
