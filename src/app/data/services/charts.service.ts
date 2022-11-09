import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
}
