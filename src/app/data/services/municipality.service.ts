import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { MunicipalityDto } from '../dto/Municipality.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../interfaces/Pagination.model';
import { SectionDto } from '../dto/Section.dto';

@Injectable({
  providedIn: 'root',
})
export class MunicipalityService extends CrudService<MunicipalityDto> {
  constructor(private http: HttpClient) {
    super('municipalities', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<SectionDto>>(`${this._base}`, { params });
  }
}
