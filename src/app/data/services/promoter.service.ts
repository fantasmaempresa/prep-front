import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { PromoterDto } from '../dto/Promoter.dto';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PromoterService extends CrudService<
  PromoterDto,
  Pagination<PromoterDto>
> {
  constructor() {
    super('promoters');
  }
}

@Injectable({
  providedIn: 'root',
})
export class OperatorTypeService extends PromoterService {
  override fetchAll(params?: HttpParams): Observable<Pagination<PromoterDto>> {
    params = new HttpParams().append('type', '1');
    return super.fetchAll(params);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GeneralCoordinateTypeService extends PromoterService {
  override fetchAll(params?: HttpParams): Observable<Pagination<PromoterDto>> {
    params = new HttpParams().append('type', '2');
    return super.fetchAll(params);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SectionCoordinateTypeService extends PromoterService {
  override fetchAll(params?: HttpParams): Observable<Pagination<PromoterDto>> {
    params = new HttpParams().append('type', '3');
    return super.fetchAll(params);
  }
}

@Injectable({
  providedIn: 'root',
})
export class MilitantTypeService extends PromoterService {
  override fetchAll(params?: HttpParams): Observable<Pagination<PromoterDto>> {
    params = new HttpParams().append('type', '4');
    return super.fetchAll(params);
  }
}
