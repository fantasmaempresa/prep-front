import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ZoneDto } from '../dto/Zone.dto';

@Injectable({
  providedIn: 'root',
})
export class ZoneService extends CrudService<ZoneDto, Pagination<ZoneDto>> {
  constructor() {
    super('zones');
  }

  politicalProfile(id: number) {
    return this._http.get(`${this._base}/political_profile/${id}`);
  }

  lockedPoliticalProfile(id: number) {
    return this._http.get(`${this._base}/political_profile/locked/${id}`);
  }

  unlockedPoliticalProfile(id: number) {
    return this._http.get(`${this._base}/political_profile/unlocked/${id}`);
  }

  saveOrUpdatePoliticalProfile(id: number, body: any) {
    return this._http.post(`${this._base}/political_profile/${id}`, { body });
  }
}
