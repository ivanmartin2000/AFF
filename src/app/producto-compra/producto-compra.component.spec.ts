import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCompraComponent } from './producto-compra.component';

describe('ProductoCompraComponent', () => {
  let component: ProductoCompraComponent;
  let fixture: ComponentFixture<ProductoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
