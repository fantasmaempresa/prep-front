import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SurveyDto } from "../dto/Survey.dto";

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  url = `${environment.base_url}/statistics`;

  constructor(private http: HttpClient) {}

  byPromoter() {
    return this.http.get(`${this.url}/promotedForPromoter`);
  }

  byDistrict(range: number) {
    return this.http.get(`${this.url}/promotedForDistrict/${range}`);
  }

  byPromoterBudget() {
    return this.http.get(`${this.url}/promotedForBudgets`);
  }

  byMunicipality(municipalityId: number) {
    return this.http.get(`${this.url}/municipality/${municipalityId}`);
  }

  surveys(surveyId: number) {
    return this.http.get<{ statistics: [{name: string, series: []}]; openQuestions: [] }>(
      `${this.url}/surveys/${surveyId}`
    );
  }
}
