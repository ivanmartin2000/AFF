import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPublicadosComponent } from './productos-publicados.component';

describe('ProductosPublicadosComponent', () => {
  let component: ProductosPublicadosComponent;
  let fixture: ComponentFixture<ProductosPublicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosPublicadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosPublicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
