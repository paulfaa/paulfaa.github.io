import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsGridComponent } from './standings-grid.component';

describe('StandingsDisplayComponent', () => {
  let component: StandingsGridComponent;
  let fixture: ComponentFixture<StandingsGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandingsGridComponent]
    });
    fixture = TestBed.createComponent(StandingsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
