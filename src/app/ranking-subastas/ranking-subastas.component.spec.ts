import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingSubastasComponent } from './ranking-subastas.component';

describe('RankingSubastasComponent', () => {
  let component: RankingSubastasComponent;
  let fixture: ComponentFixture<RankingSubastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingSubastasComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingSubastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
