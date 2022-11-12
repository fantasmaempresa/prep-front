import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BudgetsService } from '../../../../../../data/services/budgets.service';
import { map } from 'rxjs';
import { BillsService } from '../../../../../../data/services/bills.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromoterDto } from '../../../../../../data/dto/Promoter.dto';

@Component({
  selector: 'app-bills-form',
  templateUrl: './bills-form.component.html',
  styleUrls: ['./bills-form.component.scss'],
})
export class BillsFormComponent {
  budgets$ = this.data.budgets;

  billForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    amount: new FormControl<number>(0),
    description: new FormControl<string>(''),
    budget_id: new FormControl<number>(0),
  });

  constructor(
    private budgetService: BudgetsService,
    private billsService: BillsService,
    private dialogRef: MatDialogRef<BillsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromoterDto
  ) {}

  submit() {
    this.billsService.save(this.billForm.value).subscribe({
      next: () => {
        console.log('success');
        this.dialogRef.close(true);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
