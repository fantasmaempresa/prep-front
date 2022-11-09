import { Injectable } from '@angular/core';
import { FederalDistrictDto } from '../dto/FederalDistrict.dto';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class FederalDistrictService extends CrudService<
  FederalDistrictDto,
  Pagination<FederalDistrictDto>
> {
  constructor() {
    super('localDistricts');
  }
}
