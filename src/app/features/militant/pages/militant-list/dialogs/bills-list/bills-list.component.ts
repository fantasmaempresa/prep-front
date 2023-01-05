import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromoterDto } from '../../../../../../data/dto/Promoter.dto';
import { BudgetsService } from '../../../../../../data/services/budgets.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss'],
})
export class BillsListComponent implements OnInit {
  budgets$ = this.budgetService
    .budgetsByPromoter(this.data.id)
    .pipe(map((promoter) => promoter.promoter.budgets));
  resume$ = this.budgetService.budgetsByPromoter(this.data.id);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PromoterDto,
    private budgetService: BudgetsService
  ) {}

  ngOnInit(): void {
    this.budgets$.subscribe({
      next: (budgets) => {
        console.log(budgets);
      },
    });
  }
}
