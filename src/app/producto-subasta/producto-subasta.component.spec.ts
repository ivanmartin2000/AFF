import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoSubastaComponent } from './producto-subasta.component';

describe('ProductoSubastaComponent', () => {
  let component: ProductoSubastaComponent;
  let fixture: ComponentFixture<ProductoSubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoSubastaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoSubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
