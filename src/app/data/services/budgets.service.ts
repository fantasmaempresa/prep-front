import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { BudgetDto } from '../dto/Budget.dto';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService extends CrudService<
  BudgetDto,
  Pagination<BudgetDto>
> {
  constructor() {
    super('budgets');
  }
}
