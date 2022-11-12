import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { BillDto } from '../dto/Bill.dto';

@Injectable({
  providedIn: 'root',
})
export class BillsService extends CrudService<BillDto, Pagination<BillDto>> {
  constructor() {
    super('bills');
  }
}
