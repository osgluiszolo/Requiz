import { TestBed } from '@angular/core/testing';

import { CondensadoProductosService } from './condensado-productos.service';

describe('CondensadoProductosService', () => {
  let service: CondensadoProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondensadoProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
