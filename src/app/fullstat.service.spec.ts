import { TestBed } from '@angular/core/testing';

import { FullstatService } from './fullstat.service';

describe('FullstatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullstatService = TestBed.get(FullstatService);
    expect(service).toBeTruthy();
  });
});
