import { TestBed } from '@angular/core/testing';

import { ProductoSubastaService } from './producto-subasta.service';

describe('ProductoSubastaService', () => {
  let service: ProductoSubastaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoSubastaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
