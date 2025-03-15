import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarProductoComponent } from './publicar-producto.component';

describe('PublicarProductoComponent', () => {
  let component: PublicarProductoComponent;
  let fixture: ComponentFixture<PublicarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarProductoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
