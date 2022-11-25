import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ZoneDto } from '../dto/Zone.dto';

@Injectable({
  providedIn: 'root',
})
export class ZoneService extends CrudService<ZoneDto, Pagination<ZoneDto>> {
  constructor() {
    super('zones');
  }
}
