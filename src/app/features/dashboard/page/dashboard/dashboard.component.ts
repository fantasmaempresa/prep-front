import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../../../../data/services/charts.service';
import { map, Observable, tap } from 'rxjs';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { FederalDistrictService } from '../../../../data/services/federal-district.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  legendPosition: LegendPosition = LegendPosition.Below;
  byPromoters$!: Observable<any>;
  byDistrict$!: Observable<any>;
  byPromoterBudget$!: Observable<any>;

  colorScheme: Color = {
    domain: ['#2b2b2b', '#e6ddda'],
    name: 'cool',
    group: ScaleType.Linear,
    selectable: true,
  };

  view: [number, number] = [2000, 400];

  constructor(
    private chartsService: ChartsService,
    private federalDistrictsService: FederalDistrictService
  ) {}

  rangeChanged(range: number) {
    this.byDistrict$ = this.chartsService.byDistrict(range);
  }

  ngOnInit(): void {
    this.byPromoters$ = this.chartsService.byPromoter();
    this.byDistrict$ = this.chartsService.byDistrict(1).pipe(tap(console.log));
    this.byPromoterBudget$ = this.chartsService.byPromoterBudget().pipe(
      map((data: any) => data.slice(0, 5)),
      map((data: any) => {
        return data.map((item: any) => {
          for (const serie of item.series) {
            if (serie.name === 'budget') {
              serie.name = 'Presupuesto';
            }
            if (serie.name === 'bills_total') {
              serie.name = 'Gastos';
            }
            if (serie.name === 'difference') {
              serie.name = 'Restante';
            }
          }
          return item;
        });
      }),
      tap(console.log)
    );
  }

  onResize(event: any) {}
}
