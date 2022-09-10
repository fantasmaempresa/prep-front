import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { SectionDto } from '../dto/Section.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../interfaces/Pagination.model';

@Injectable({
  providedIn: 'root',
})
export class SectionService extends CrudService<SectionDto> {
  constructor(private http: HttpClient) {
    super('sections', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<SectionDto>>(`${this._base}`, { params });
  }
}
