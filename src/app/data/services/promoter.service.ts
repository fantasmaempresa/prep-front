import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { PromoterDto } from '../dto/Promoter.dto';

@Injectable({
  providedIn: 'root',
})
export class PromoterService extends CrudService<
  PromoterDto,
  Pagination<PromoterDto>
> {
  constructor() {
    super('promoters');
  }
}
