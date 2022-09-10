import { TestBed } from '@angular/core/testing';

import { LocalDistrictService } from './local-district.service';

describe('LocalDistrictService', () => {
  let service: LocalDistrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDistrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
