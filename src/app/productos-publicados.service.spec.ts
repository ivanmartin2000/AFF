import { TestBed } from '@angular/core/testing';

import { ProductosPublicadosService } from './productos-publicados.service';

describe('ProductosPublicadosService', () => {
  let service: ProductosPublicadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosPublicadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
