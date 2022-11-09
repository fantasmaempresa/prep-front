import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { SectionDto } from '../dto/Section.dto';

@Injectable({
  providedIn: 'root',
})
export class SectionService extends CrudService<
  SectionDto,
  Pagination<SectionDto>
> {
  constructor() {
    super('sections');
  }
}
