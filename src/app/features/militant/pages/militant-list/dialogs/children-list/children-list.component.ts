import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromoterDto } from '../../../../../../data/dto/Promoter.dto';
import { PromoterService } from '../../../../../../data/services/promoter.service';
import { Observable, tap } from "rxjs";

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss'],
})
export class ChildrenListComponent implements OnInit {
  // promoter$: Observable<PromoterDto> = this.promoterService.fetch(this.data.id);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PromoterDto,
    private dialogRef: MatDialogRef<ChildrenListComponent>,
  ) {}

  ngOnInit(): void {

    // this.promoter$.subscribe({
    //   next: (promoter) => {
    //     console.log(promoter);
    //   }
    // })
  }
}
