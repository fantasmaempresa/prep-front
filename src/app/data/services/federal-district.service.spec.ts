import { TestBed } from '@angular/core/testing';

import { FederalDistrictService } from './federal-district.service';

describe('FederalDistrictService', () => {
  let service: FederalDistrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FederalDistrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
