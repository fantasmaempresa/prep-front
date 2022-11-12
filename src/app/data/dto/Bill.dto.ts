import { EntityDto } from 'o2c_core';

export interface BillDto extends EntityDto {
  name: string;
  amount: number;
  description: string;
  budget_id: number;
}
