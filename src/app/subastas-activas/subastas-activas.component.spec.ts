import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastasActivasComponent } from './subastas-activas.component';

describe('SubastasActivasComponent', () => {
  let component: SubastasActivasComponent;
  let fixture: ComponentFixture<SubastasActivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubastasActivasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubastasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
