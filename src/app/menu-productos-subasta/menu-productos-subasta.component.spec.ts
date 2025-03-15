import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProductosSubastaComponent } from './menu-productos-subasta.component';

describe('MenuProductosSubastaComponent', () => {
  let component: MenuProductosSubastaComponent;
  let fixture: ComponentFixture<MenuProductosSubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuProductosSubastaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuProductosSubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
