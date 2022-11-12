import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BudgetsService } from '../../../../../../data/services/budgets.service';
import { BillsService } from '../../../../../../data/services/bills.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromoterDto } from '../../../../../../data/dto/Promoter.dto';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit {
  budgetForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    amount: new FormControl<number>(0),
    description: new FormControl<string>(''),
    promoter_id: new FormControl<number>(0),
  });

  constructor(
    private budgetService: BudgetsService,
    private billsService: BillsService,
    private dialogRef: MatDialogRef<BudgetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromoterDto
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.budgetForm.get('promoter_id')?.setValue(this.data.id);
  }

  submit() {
    this.budgetService.save(this.budgetForm.value).subscribe({
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
