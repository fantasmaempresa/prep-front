import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SurveyService } from '../../../../data/services/survey.service';
import { map, shareReplay, switchMap, tap } from 'rxjs';
import { ChartsService } from '../../../../data/services/charts.service';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { QuestionService } from '../../../../data/services/question.service';
import { MessageHelper } from 'o2c_core';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
})
export class SurveysComponent implements OnInit {
  surveyControl = new FormControl();

  openQuestionsControl = new FormControl();

  surveys$ = this.surveyService.fetchAll().pipe(map((data) => data.data));

  answersToOpenQuestion$ = this.openQuestionsControl.valueChanges.pipe(
    tap(() => MessageHelper.showLoading('Obteniendo información')),
    switchMap((questionId) => this.questionService.fetch(questionId)),
    tap(() => MessageHelper.getInstanceSwal().close())
  );

  statistics$ = this.surveyControl.valueChanges.pipe(
    tap(() => MessageHelper.showLoading('Obteniendo información')),
    switchMap((surveyId) => this.chartService.surveys(surveyId)),
    shareReplay(1),
    tap(() => MessageHelper.getInstanceSwal().close())
  );

  openQuestions$: any = this.statistics$.pipe(
    map((data) => data.openQuestions)
  );

  colorScheme: Color = {
    domain: ['#2b2b2b', '#e6ddda'],
    name: 'cool',
    group: ScaleType.Linear,
    selectable: true,
  };

  legendPosition = LegendPosition.Below;

  stats = [];
  constructor(
    private surveyService: SurveyService,
    private chartService: ChartsService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {}
}
