import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SurveyService } from '../../../../data/services/survey.service';
import { map, switchMap } from 'rxjs';
import { ChartsService } from '../../../../data/services/charts.service';
import { Color, ScaleType } from "@swimlane/ngx-charts";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
})
export class SurveysComponent implements OnInit {
  surveyControl = new FormControl();

  surveys$ = this.surveyService.fetchAll().pipe(map((data) => data.data));

  statistics$ = this.surveyControl.valueChanges.pipe(
    switchMap((surveyId) => this.chartService.surveys(surveyId))
  );

  colorScheme: Color = {
    domain: ['#2b2b2b', '#e6ddda'],
    name: 'cool',
    group: ScaleType.Linear,
    selectable: true,
  };

  stats = [];
  constructor(
    private surveyService: SurveyService,
    private chartService: ChartsService
  ) {}

  ngOnInit(): void {
    this.statistics$.subscribe((data) => {
      // this.stats = data.statistics;
      // console.log(data);
    });
  }
}
