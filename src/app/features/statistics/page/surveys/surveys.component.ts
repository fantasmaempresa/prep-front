import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SurveyService } from '../../../../data/services/survey.service';
import { map, shareReplay, switchMap, tap } from 'rxjs';
import { ChartsService } from '../../../../data/services/charts.service';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { QuestionService } from '../../../../data/services/question.service';

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
    switchMap((questionId) => this.questionService.fetch(questionId))
  );

  statistics$ = this.surveyControl.valueChanges.pipe(
    switchMap((surveyId) => this.chartService.surveys(surveyId)),
    shareReplay(1)
  );

  openQuestions$: any = this.statistics$.pipe(
    tap((data) => console.log(data)),
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
