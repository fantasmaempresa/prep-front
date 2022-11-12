import { EntityDto } from 'o2c_core';
import { BudgetDto } from './Budget.dto';

export interface PromoterDto extends EntityDto {
  budgets: BudgetDto[];
  father_last_name: string;
  mother_last_name: string;
  curp: string;
  ocr: string;
  elector_key: string;
  cellphone: string;
  home_phone: string;
  email: string;
  address: string;
  type: number;
  lat: number;
  lng: number;
  promoter_id?: number;
  section_id: number;
}
