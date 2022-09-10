import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../interfaces/Pagination.model';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { LocalDistrictDto } from '../dto/LocalDistrict.dto';

@Injectable({
  providedIn: 'root',
})
export class LocalDistrictService extends CrudService<LocalDistrictDto> {
  constructor(private http: HttpClient) {
    super('localDistricts', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<LocalDistrictDto>>(`${this._base}`, {
      params,
    });
  }
}
