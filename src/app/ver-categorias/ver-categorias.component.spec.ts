import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerCategoriasComponent } from './ver-categorias.component';

describe('VerCategoriasComponent', () => {
  let component: VerCategoriasComponent;
  let fixture: ComponentFixture<VerCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCategoriasComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
