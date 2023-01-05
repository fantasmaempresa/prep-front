import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { BudgetDto } from '../dto/Budget.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PromoterDto } from '../dto/Promoter.dto';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService extends CrudService<
  BudgetDto,
  Pagination<BudgetDto>
> {
  constructor(private http: HttpClient) {
    super('budgets');
  }

  budgetsByPromoter(promoterId: number) {
    return this.http.get<{
      promoter: PromoterDto;
      budget: number;
      bills_total: number;
      difference: number;
    }>(`${environment.base_url}/budgets/filter/${promoterId}`);
  }
}
