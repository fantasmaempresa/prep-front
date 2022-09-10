import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { FederalDistrictDto } from '../dto/FederalDistrict.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../interfaces/Pagination.model';
import { LocalDistrictDto } from '../dto/LocalDistrict.dto';

@Injectable({
  providedIn: 'root',
})
export class FederalDistrictService extends CrudService<FederalDistrictDto> {
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
