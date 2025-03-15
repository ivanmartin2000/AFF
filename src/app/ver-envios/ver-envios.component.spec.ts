import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEnviosComponent } from './ver-envios.component';

describe('VerEnviosComponent', () => {
  let component: VerEnviosComponent;
  let fixture: ComponentFixture<VerEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerEnviosComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
