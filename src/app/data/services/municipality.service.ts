import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { MunicipalityDto } from '../dto/Municipality.dto';

@Injectable({
  providedIn: 'root',
})
export class MunicipalityService extends CrudService<
  MunicipalityDto,
  Pagination<MunicipalityDto>
> {
  constructor() {
    super('municipalities');
  }
}
