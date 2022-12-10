// import { RoleDto } from './Role.dto';

import { EntityDto } from 'o2c_core';

export interface UserDto extends EntityDto {
  name: string;
  email: string;

  password?: string;

  // role: RoleDto;
}
