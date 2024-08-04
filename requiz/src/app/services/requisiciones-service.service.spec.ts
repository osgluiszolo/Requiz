import { TestBed } from '@angular/core/testing';

import { RequisicionesServiceService } from './requisiciones-service.service';

describe('RequisicionesServiceService', () => {
  let service: RequisicionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisicionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
