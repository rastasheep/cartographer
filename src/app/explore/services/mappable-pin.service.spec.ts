import { TestBed } from '@angular/core/testing';

import { MappablePinService } from './mappable-pin.service';

describe('MappablePinService', () => {
  let service: MappablePinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappablePinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
