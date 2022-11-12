import { EntityDto } from 'o2c_core';
import { BillDto } from './Bill.dto';

export interface BudgetDto extends EntityDto {
  name: string;
  amount: number;
  description: string;
  promoter_id: number;
  bills?: BillDto[];
}
