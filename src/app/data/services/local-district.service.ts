import { Injectable } from '@angular/core';
import { LocalDistrictDto } from '../dto/LocalDistrict.dto';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class LocalDistrictService extends CrudService<
  LocalDistrictDto,
  Pagination<LocalDistrictDto>
> {
  constructor() {
    super('localDistricts');
  }
}
