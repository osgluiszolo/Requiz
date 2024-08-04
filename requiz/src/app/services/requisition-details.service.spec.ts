import { TestBed } from '@angular/core/testing';

import { RequisitionDetailsService } from './requisition-details.service';

describe('RequisitionDetailsService', () => {
  let service: RequisitionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
