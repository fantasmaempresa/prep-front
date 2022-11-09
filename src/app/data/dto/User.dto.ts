// import { RoleDto } from './Role.dto';

import { EntityDto } from 'o2c_core';

export interface UserDto extends EntityDto {
  email: string;

  password?: string;

  config: object;

  role_id: number;

  online: number;

  // role: RoleDto;
}
