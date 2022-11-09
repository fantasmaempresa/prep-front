import { EntityDto } from 'o2c_core';

export interface UserAuthDto extends EntityDto {
  email: string;
  email_verified_at: Date;
  config: object;
  role_id: number;
}
