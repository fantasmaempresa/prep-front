import { Injectable } from '@angular/core';
import { CrudService, Pagination } from "o2c_core";
import { UserDto } from "../dto/User.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserDto, Pagination<UserDto>> {
  constructor() {
    super('users');
  }
}
