import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuProductosVentaComponent } from './menu-productos-venta.component';

describe('MenuProductosVentaComponent', () => {
  let component: MenuProductosVentaComponent;
  let fixture: ComponentFixture<MenuProductosVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuProductosVentaComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProductosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
