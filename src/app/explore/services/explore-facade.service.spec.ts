import { TestBed } from '@angular/core/testing';

import { ExploreFacadeService } from './explore-facade.service';

describe('ExploreFacadeService', () => {
  let service: ExploreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
