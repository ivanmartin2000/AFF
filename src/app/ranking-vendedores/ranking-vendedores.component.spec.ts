import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingVendedoresComponent } from './ranking-vendedores.component';

describe('RankingVendedoresComponent', () => {
  let component: RankingVendedoresComponent;
  let fixture: ComponentFixture<RankingVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingVendedoresComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
