import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from "rxjs";
import { MunicipalityDto } from '../../../../data/dto/Municipality.dto';
import { MunicipalityService } from '../../../../data/services/municipality.service';
import { FormControl } from '@angular/forms';
import { ChartsService } from '../../../../data/services/charts.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  municipalities$: Observable<MunicipalityDto[]> = this.municipalityService
    .fetchAll()
    .pipe(map((data) => data.data));

  municipalityControl = new FormControl();
  optionControl = new FormControl();

  statistics$ = this.municipalityControl.valueChanges.pipe(
    switchMap((municipalityId) =>
      this.chartService.byMunicipality(municipalityId)
    ),
    map((value: any) => {
      let first = value.statistics[0].data.shift();
      return value.statistics[0]
    })
  );

  population = this.municipalityControl.valueChanges.pipe(
    switchMap((municipalityId) =>
      this.chartService.byMunicipality(municipalityId)
    ),
    map((value: any) => value.statistics[0].data.shift())
  );

  statisticsByOption: any;

  constructor(
    private municipalityService: MunicipalityService,
    private chartService: ChartsService
  ) {}

  ngOnInit(): void {
    this.statistics$.subscribe((data) => console.log(data));

    this.municipalityControl.valueChanges.subscribe((municipalityId) => {
      this.statisticsByOption = null;
    });

    this.optionControl.valueChanges.subscribe((data) => {
      this.statisticsByOption = data;
    });
  }
}
